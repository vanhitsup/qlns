<?php

namespace App\Http\Controllers\HR\JobApplication;

use Exception;
use Carbon\Carbon;
use App\Models\Email;
use App\Models\Users;
use App\Mail\Sendmail;
use App\Models\AppSetting;
use App\Models\EmailConfig;
use App\Models\JobInterview;
use Illuminate\Http\Request;
use App\Models\JobApplication;
use Illuminate\Http\JsonResponse;
use App\Models\JobInterviewMember;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\MailStructure\MailStructure;
use Illuminate\Support\Facades\Mail;

class JobInterviewController extends Controller
{
    protected MailStructure $MailStructure;

    public function __construct(MailStructure $MailStructure)
    {
        $this->MailStructure = $MailStructure;
    }
    //create a single jobInterview controller method
    public function createJobInterview(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $scheduleData = (Carbon::parse($request->input('scheduleDate')))->toDateString();
            $scheduleTime = (Carbon::parse($request->input('scheduleTime')))->toTimeString();

            $applicationStatus = JobApplication::where('id', $request->input('jobApplicationId'))
                ->with('job.jobLocation', 'jobApplicationStatus')
                ->first();

            $currentStatus = $applicationStatus->jobApplicationStatus->applicationStatus;

            if ($currentStatus !== 'SELECTED FOR INTERVIEW') {
                return response()->json(['error' => 'Candidate Not Selected for interview',
            'status'=>$currentStatus ], 404);
            }

            $createdJobInterview = JobInterview::create([
                'jobApplicationId' => $request->input('jobApplicationId'),
                'scheduleDate' => $scheduleData,
                'scheduleTime' => $scheduleTime,
                'comment' => $request->input('comment'),
            ]);
            if ($createdJobInterview) {
                collect($request->input('assignedMembers'))->map(function ($memberId) use ($createdJobInterview) {
                    JobInterviewMember::create([
                        'jobInterviewId' => $createdJobInterview->id,
                        'userId' => $memberId,
                    ]);
                });

                JobApplication::where('id', $request->input('jobApplicationId'))
                    ->update([
                        'applicationStatusId' => 4
                    ]);
            }

            // email sending system integrate start
            $data = $request->attributes->get('data');
            $mailResponser = Users::where('id', $data['sub'])
                ->with('designationHistory.designation')
                ->select('id', 'firstName', 'lastName', 'userName', 'email')
                ->first();
            //get mailResponser leatest designation
            $mailResponserDesignation = $mailResponser->designationHistory->last();

            if ($createdJobInterview) {
                $emailConfig = EmailConfig::first();
                $companyName = AppSetting::first();

                if (!$emailConfig) {
                    return response()->json(['error' => 'SMTP not configured properly!'], 404);
                }

                try {
                    //set the config
                    config([
                        'mail.mailers.smtp.host' => $emailConfig->emailHost,
                        'mail.mailers.smtp.port' => $emailConfig->emailPort,
                        'mail.mailers.smtp.encryption' => $emailConfig->emailEncryption,
                        'mail.mailers.smtp.username' => $emailConfig->emailUser,
                        'mail.mailers.smtp.password' => $emailConfig->emailPass,
                        'mail.mailers.smtp.local_domain' => env('MAIL_EHLO_DOMAIN'),
                        'mail.from.address' => $emailConfig->emailUser,
                        'mail.from.name' => $emailConfig->emailConfigName,
                    ]);

                    $mailData = [
                        'title' => "Job Interview",
                        "candidateName" => $applicationStatus->name,
                        "candidateEmail" => $applicationStatus->email,
                        "candidatePhone" => $applicationStatus->phone,
                        "jobTitle" => $applicationStatus->job->jobTitle,

                        "scheduleDate" => $createdJobInterview->scheduleDate,
                        "scheduleTime" => $createdJobInterview->scheduleTime,
                        "interviewLocation" => $applicationStatus->job->jobLocation->jobLocation . ", " . $applicationStatus->job->jobLocation->countryName,

                        "companyName" => $companyName->companyName,
                        "mailResponserName" => $mailResponser->firstName . " " . $mailResponser->lastName,
                        "mailResponserEmail" => $mailResponser->email,
                        "mailResponserDesignation" => $mailResponserDesignation->designation->name,
                    ];

                    $data = $request->attributes->get('data');
                    $emailConfig = EmailConfig::first();
                    $company = AppSetting::first();
                    $createEmail = Email::create([
                        'emailOwnerId' => $data['sub'],
                        'senderEmail' => $emailConfig->emailUser,
                        'receiverEmail' => $request->receiverEmail ?? $applicationStatus->email,
                        'subject' => $request->subject ?? 'Create Job Interview',
                        'body' => $request->body ?? 'No Body',
                        'emailStatus' => 'sent',
                        'emailType' => $request->emailType ?? 'hrm',
                    ]);

                    if (!$createEmail) {
                        return response()->json(['error' => 'An error occur while creating email!'], 404);
                    }
                    $this->MailStructure->jobInterviewMail($applicationStatus->email, $mailData);
                } catch (Exception $err) {
                    DB::rollBack();
                    return response()->json(['error' => 'Failed to send email, SMTP not configured properly!', $err->getMessage()], 404);
                }
            }

            $converted = arrayKeysToCamelCase($createdJobInterview->toArray());
            // dd($converted, $mailData);
            DB::commit();
            return response()->json($converted, 201);
        } catch (Exception $err) {
            DB::rollBack();
            return response()->json(['error' => 'An error occurred during creating jobInterview , please try again later', $err->getMessage()], 500);
        }
    }

    // get all jobInterview controller method
    public function getAllJobInterview(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllJobInterview = JobInterview::orderBy('id', 'desc')
                    ->where('status', 'true')
                    ->get();

                $converted = arrayKeysToCamelCase($getAllJobInterview->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting jobInterview , please try again later'], 500);
            }
        } else if ($request->query('query') === 'search') {
            try {
                $pagination = getPagination($request->query());
                $key = trim($request->query('key'));

                $getAllJobInterview = JobInterview::where('status', 'true')
                    ->with('jobApplication.job', 'jobInterviewMember.user:id,username,email,phone', 'jobApplication.jobApplicationStatus')
                    ->where(function ($query) use ($key) {
                        $query->when($key, function ($subQuery) use ($key) {
                            $subQuery->orWhereHas('jobApplication', function ($subSubQuery) use ($key) {
                                $subSubQuery->where('name', 'LIKE', '%' . $key . '%');
                            });
                        });
                    })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobInterviewCount = JobInterview::with('jobApplication.job', 'jobInterviewMember.user:id,username,email,phone')
                    ->where(function ($query) use ($key) {
                        $query->orWhere('id', $key)
                            ->when($key, function ($subQuery) use ($key) {
                                $subQuery->orWhereHas('jobApplication', function ($subSubQuery) use ($key) {
                                    $subSubQuery->where('name', 'LIKE', '%' . $key . '%');
                                });
                            });
                    })
                    ->where('status', 'true')
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobInterview->toArray());
                $finalResult = [
                    'getAllJobInterview' => $converted,
                    'totalJobInterview' => $getAllJobInterviewCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting jobInterview , please try again later'], 500);
            }
        } else if ($request->query()) {
            try {
                $pagination = getPagination($request->query());

                $getAllJobInterview = JobInterview::with('jobApplication.job', 'jobInterviewMember.user:id,username,email,phone', 'jobApplication.jobApplicationStatus')
                    ->when($request->query('applicationStatusId'), function ($query) use ($request) {
                        $query->orWhereHas('jobApplication', function ($subQuery) use ($request) {
                            $subQuery->where('applicationStatusId', $request->query('applicationStatusId'));
                        });
                    })
                    ->when($request->query('interviewStatus'), function ($query) use ($request) {
                        return $query->whereIn('interviewStatus', explode(',', $request->query('interviewStatus')));
                    })
                    ->when($request->query('scheduleDate'), function ($query) use ($request) {
                        return $query->whereIn('scheduleDate', explode(',', $request->query('scheduleDate')));
                    })
                    ->when($request->query('status'), function ($query) use ($request) {
                        return $query->whereIn('status', explode(',', $request->query('status')));
                    })
                    ->when($request->query('jobId'), function ($query) use ($request) {
                        $query->whereHas('jobApplication', function ($subQuery) use ($request) {
                            return $subQuery->Where('jobId', $request->query('jobId'));
                        });
                    })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobInterviewCount = JobInterview::with('jobApplication.job', 'jobInterviewMember.user:id,username,email,phone', 'jobApplication.jobApplicationStatus')
                    ->when($request->query('applicationStatusId'), function ($query) use ($request) {
                        $query->orWhereHas('jobApplication', function ($subQuery) use ($request) {
                            $subQuery->where('applicationStatusId', $request->query('applicationStatusId'));
                        });
                    })
                    ->when($request->query('interviewStatus'), function ($query) use ($request) {
                        return $query->whereIn('interviewStatus', explode(',', $request->query('interviewStatus')));
                    })
                    ->when($request->query('scheduleDate'), function ($query) use ($request) {
                        return $query->whereIn('scheduleDate', explode(',', $request->query('scheduleDate')));
                    })
                    ->when($request->query('status'), function ($query) use ($request) {
                        return $query->whereIn('status', explode(',', $request->query('status')));
                    })
                    ->when($request->query('jobId'), function ($query) use ($request) {
                        $query->whereHas('jobApplication', function ($subQuery) use ($request) {
                            return $subQuery->Where('jobId', $request->query('jobId'));
                        });
                    })
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobInterview->toArray());
                $finalResult = [
                    'getAllJobInterview' => $converted,
                    'totalJobInterview' => $getAllJobInterviewCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting jobInterview , please try again later', $err->getMessage()], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid query!'], 400);
        }
    }

    // get a single jobInterview controller method
    public function getSingleJobInterview(Request $request, $id): JsonResponse
    {
        try {
            $getSingleJobInterview = JobInterview::where('id', $id)
                ->with('jobApplication.job', 'jobInterviewMember.user:id,username,email,phone', 'jobApplication.jobApplicationStatus')
                ->first();

            // modify cv url for show
            $currentAppUrl = url("/");
            $getSingleJobInterview->jobApplication->cvUrl = "{$currentAppUrl}/files/{$getSingleJobInterview->jobApplication->cv}";

            if (!$getSingleJobInterview) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $converted = arrayKeysToCamelCase($getSingleJobInterview->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting jobInterview , please try again later'], 500);
        }
    }

    // update a single jobInterview controller method
    public function updateJobInterview(Request $request, $id): JsonResponse
    {
        try {
            $updatedJobInterview = JobInterview::where('id', $id)
                ->update([
                    'jobApplicationId' => $request->input('jobApplicationId'),
                    'scheduleDate' => $request->input('scheduleDate'),
                    'scheduleTime' => $request->input('scheduleTime'),
                    'comment' => $request->input('comment'),
                ]);

            if ($updatedJobInterview === 1) {

                $deletedPrevMembers = JobInterviewMember::where('jobInterviewId', $id)->delete();
                if ($deletedPrevMembers) {
                    collect($request->input('assignedMembers'))->map(function ($memberId) use ($id) {
                        JobInterviewMember::where('jobInterviewId', $id)->updateOrCreate([
                            'jobInterviewId' => $id,
                            'userId' => $memberId,
                        ]);
                    });
                }
            }

            if (!$updatedJobInterview) {
                return response()->json(['error' => 'Failed to update jobInterview '], 404);
            }
            return response()->json(['message' => 'JobInterview  updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updating jobInterview , please try again later'], 500);
        }
    }

    // delete a single jobInterview controller method
    public function deleteJobInterview(Request $request, $id): JsonResponse
    {
        try {
            if ($request->input('interviewStatus')) {
                if ($request->input('interviewStatus') === 'INTERVIEWED') {
                    $changeInterviewStatus = JobInterview::where('id', $id)
                        ->update([
                            'interviewStatus' => $request->input('interviewStatus'),
                        ]);

                    JobApplication::where('id', $request->input('jobApplicationId'))
                        ->update([
                            'applicationStatusId' => 5,
                        ]);
                } else {
                    $changeInterviewStatus = JobInterview::where('id', $id)
                        ->update([
                            'interviewStatus' => $request->input('interviewStatus'),
                        ]);
                }

                if (!$changeInterviewStatus) {
                    return response()->json(['error' => 'Not Found!'], 404);
                }
                return response()->json(['message' => 'Job Interview  Status Changed successfully'], 200);
            } else {
                $deletedJobInterview = JobInterview::where('id', $id)
                    ->update([
                        'status' => $request->input('status'),
                    ]);

                if (!$deletedJobInterview) {
                    return response()->json(['error' => 'Failed to delete job Interview '], 404);
                }
                return response()->json(['message' => 'Job Interview  deleted successfully!'], 200);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting jobInterview , please try again later', $err->getMessage()], 500);
        }
    }
}
