<?php

namespace App\Http\Controllers\HR\JobApplication;

use Exception;
use Carbon\Carbon;
use App\Models\Job;
use App\Models\Email;
use App\Models\Users;
use App\Mail\Sendmail;
use App\Models\AppSetting;
use App\Models\EmailConfig;
use Illuminate\Http\Request;
use App\Models\JobApplication;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\MailStructure\MailStructure;
use App\Models\JobApplicationStatus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Js;

class JobApplicationController extends Controller
{
    protected MailStructure $MailStructure;

    public function __construct(MailStructure $MailStructure)
    {
        $this->MailStructure = $MailStructure;
    }

    //create a single jobApplication controller method
    public function createJobApplication(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedJobApplication = JobApplication::destroy($ids);

                $deletedCount = [
                    'count' => $deletedJobApplication,
                ];

                return response()->json($deletedCount, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during deleting jobApplication , please try again later'], 500);
            }
        } else {
            try {
                DB::beginTransaction();
                if ($request->file_paths) {
                    $file = $request->file_paths[0];
                    $createdJobApplication = JobApplication::create([
                        'jobId' => $request->input('jobId'),
                        'name' => $request->input('name'),
                        'email' => $request->input('email'),
                        'phone' => $request->input('phone'),
                        'address' => $request->input('address'),
                        'cv' => $file,
                        'coverLater' => $request->input('coverLater'),
                        'applicationStatusId' => 1, // [APPLIED=1]
                    ]);
                } else {
                    DB::rollBack();
                    return response()->json(['error' => 'cv required!'], 400);
                }

                $jobData = Job::where('id', $request->input('jobId'))->first();

                if ($createdJobApplication) {
                    $emailConfig = EmailConfig::first();
                    $companyName = AppSetting::first();

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
                        'title' => "Job Application",

                        "candidateName" => $createdJobApplication->name,
                        "candidateEmail" => $createdJobApplication->email,

                        "jobTitle" => $jobData->jobTitle ?? null,

                        "companyName" => $companyName->companyName,
                    ];
                    
                    $createEmail = Email::create([
                        'emailOwnerId' => 1,
                        'senderEmail' => $emailConfig->emailUser,
                        'receiverEmail' => $request->receiverEmail ?? $createdJobApplication->email,
                        'subject' => $request->subject ?? 'Create Job Application',
                        'body' => $request->body ?? 'No Body',
                        'emailStatus' => 'sent',
                        'emailType' => $request->emailType ?? 'hrm',
                    ]);

                    if(!$createEmail){
                        return response()->json(['error' => 'An error occur while creating email!'], 404);
                    }

                    $this->MailStructure->jobApplicationMail($createdJobApplication->email, $mailData);
                }


                $converted = arrayKeysToCamelCase($createdJobApplication->toArray());
                DB::commit();
                return response()->json($converted, 201);
            } catch (Exception $err) {
                DB::rollBack();
                return response()->json(['error' => 'An error occurred during creating jobApplication , please try again later', $err->getMessage()], 500);
            }
        }
    }

    // get all jobApplication controller method
    public function getAllJobApplication(Request $request): JsonResponse
    {
        
        

        if ($request->query('query') === 'all') {
            try {
                $getAllJobApplication = JobApplication::orderBy('id', 'desc')
                    ->with('jobApplicationStatus')
                    ->where('status', 'true')
                    ->get();

                // modify cv url for show
                $currentAppUrl = url("/");
                $getAllJobApplication->each(function ($item) use ($currentAppUrl) {
                    $item->cvUrl = "$currentAppUrl/files/$item->cv";
                });

                $converted = arrayKeysToCamelCase($getAllJobApplication->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting jobApplication , please try again later'], 500);
            }
        }else if ($request->query('query') === 'selected') {
            try {
                $selectedApplications = JobApplication::with('job', 'jobApplicationStatus')
                ->whereHas('jobApplicationStatus', function ($query) {
                    $query->where('applicationStatus', 'SELECTED FOR INTERVIEW');
                })
                    ->orderBy('id', 'desc')
                    ->get();

                $converted = arrayKeysToCamelCase($selectedApplications->toArray());
                    $result = [
                        'getAllJobApplication' => $converted,
                    ];
                return response()->json($result, 200);
        
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during fetching job applications, please try again later'], 500);
            }
        }else if ($request->query('query') === 'search') {
            try {
                $pagination = getPagination($request->query());
                $key = trim($request->query('key'));

                $getAllJobApplication = JobApplication::with('job', 'jobApplicationStatus')
                    ->where(function ($query) use ($key) {
                        return $query->orWhere('id', $key)
                            ->orWhere('name', 'LIKE', '%' . $key . '%')
                            ->orWhere('email', 'LIKE', '%' . $key . '%')
                            ->orWhere('phone', 'LIKE', '%' . $key . '%')
                            ->orWhereHas('job', function ($subQuery) use ($key) {
                                $subQuery->where('jobTitle', 'LIKE', '%' . $key . '%');
                            });
                    })
                    ->where('status', 'true')
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                // modify cv url for show
                $currentAppUrl = url("/");
                $getAllJobApplication->each(function ($item) use ($currentAppUrl) {
                    $item->cvUrl = "$currentAppUrl/files/$item->cv";
                });

                $getAllJobApplicationCount = JobApplication::with('job', 'jobApplicationStatus')
                    ->where(function ($query) use ($key) {
                        return $query->orWhere('id', $key)
                            ->orWhere('name', 'LIKE', '%' . $key . '%')
                            ->orWhere('email', 'LIKE', '%' . $key . '%')
                            ->orWhere('phone', 'LIKE', '%' . $key . '%')
                            ->orWhereHas('job', function ($subQuery) use ($key) {
                                $subQuery->where('jobTitle', 'LIKE', '%' . $key . '%');
                            });
                    })
                    ->where('status', 'true')
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobApplication->toArray());
                $finalResult = [
                    'getAllJobApplication' => $converted,
                    'totalJobApplication' => $getAllJobApplicationCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting jobApplication , please try again later'], 500);
            }
        } else if ($request->query()) {
            try {
                $pagination = getPagination($request->query());

                $getAllJobApplication = JobApplication::with('job', 'jobApplicationStatus')
                    ->when($request->query('applicationStatusId'), function ($query) use ($request) {
                        return $query->orWhereHas('jobApplicationStatus', function ($subQuery) use ($request) {
                            $subQuery->whereIn('id', explode(',', $request->query('applicationStatusId')));
                        });
                    })
                    ->when($request->query('status'), function ($query) use ($request) {
                        return $query->whereIn('status', explode(',', $request->query('status')));
                    })
                    ->when($request->query('jobId'), function ($query) use ($request) {
                        return $query->whereIn('jobId', explode(',', $request->query('jobId')));
                    })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();


                // modify cv url for show
                $currentAppUrl = url("/");
                $getAllJobApplication->each(function ($item) use ($currentAppUrl) {
                    $item->cvUrl = "$currentAppUrl/files/$item->cv";
                });

                $getAllJobApplicationCount = JobApplication::with('job', 'jobApplicationStatus')
                    ->when($request->query('applicationStatusId'), function ($query) use ($request) {
                        return $query->orWhereHas('jobApplicationStatus', function ($subQuery) use ($request) {
                            $subQuery->whereIn('id', explode(',', $request->query('applicationStatusId')));
                        });
                    })
                    ->when($request->query('status'), function ($query) use ($request) {
                        return $query->whereIn('status', explode(',', $request->query('status')));
                    })
                    ->when($request->query('jobId'), function ($query) use ($request) {
                        return $query->whereIn('jobId', explode(',', $request->query('jobId')));
                    })
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobApplication->toArray());
                $finalResult = [
                    'getAllJobApplication' => $converted,
                    'totalJobApplication' => $getAllJobApplicationCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting jobApplication , please try again later'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid query!'], 400);
        }
    }

    // get a single jobApplication controller method
    public function getSingleJobApplication(Request $request, $id): JsonResponse
    {
        try {

            $getSingleJobApplication = JobApplication::where('id', $id)
                ->with('job', 'jobApplicationStatus')
                ->first();
            if ($getSingleJobApplication == null) {
                return response()->json(['error' => 'Not Found!'], 404);
            }
            // modify cv url for show
            $currentAppUrl = url("/");
            $getSingleJobApplication->cvUrl = "$currentAppUrl/files/$getSingleJobApplication->cv";


            if (!$getSingleJobApplication) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $converted = arrayKeysToCamelCase($getSingleJobApplication->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting jobApplication , please try again later'], 500);
        }
    }

    // update a single jobApplication controller method
    public function updateJobApplication(Request $request, $id): JsonResponse
    {
        try {
         
            $file = $request->file_paths[0] ?? null;
            
            $jobApplication = JobApplication::where('id', $id)->first();
            //return response()->json($request->all());
            $updatedJobApplication = JobApplication::where('id', $id)
                ->update([
                    'name' => $request->input('name') ?? $jobApplication->name,
                    'email' => $request->input('email') ?? $jobApplication->email,
                    'phone' => $request->input('phone') ?? $jobApplication->phone,
                    'address' => $request->input('address') ?? $jobApplication->address,
                // if file is not empty then update cv else not
                    'cv' => $file ?? JobApplication::where('id', $id)->first()->cv,
                    'coverLater' => $request->input('coverLater') ?? $jobApplication->coverLater,
                ]);
            //$updatedJobApplication->save();


            if (!$updatedJobApplication) {
                return response()->json(['error' => 'Failed to update jobApplication '], 404);
            }
            return response()->json(['message' => 'JobApplication  updated successfully'], 200);
        } catch (Exception $err) {  
                   
            return response()->json(['error' => 'An error occurred during updating jobApplication , please try again later' , "err"=> $err, "id"=>$id], 500);
        }
    }

    
  
       
    
    // delete a single jobApplication controller method
    public function deleteJobApplication(Request $request, $id): JsonResponse
    {
        try {
            if ($request->input('applicationStatusId')) {
                $changeApplicationStatus = JobApplication::where('id', $id)
                    ->update([
                        'applicationStatusId' => $request->input('applicationStatusId'),
                    ]);

                if (!$changeApplicationStatus) {
                    return response()->json(['error' => 'Not Found!'], 404);
                }

                $jobApplication = JobApplication::where('id', $id)->first();
                $jobData = Job::where('id', $jobApplication->jobId)->first();
                $companyName = AppSetting::first();
                $jobStatus = JobApplicationStatus::where('id', $request->input('applicationStatusId'))->first();
                $mailData = [
                    "candidateName" => $jobApplication->name,
                    "candidateEmail" => $jobApplication->email,
                    "jobTitle" => $jobData->jobTitle ?? null,
                    "companyName" => $companyName->companyName,
                    "status" => $jobStatus->applicationStatus,
                ];

                $data = $request->attributes->get('data');
                $emailConfig = EmailConfig::first();
                $createEmail = Email::create([
                    'emailOwnerId' => $data['sub'],
                    'senderEmail' => $emailConfig->emailUser,
                    'receiverEmail' => $request->receiverEmail ?? $jobApplication->email,
                    'subject' => $request->subject ?? 'Update Job Application Status',
                    'body' => $request->body ?? 'No Body',
                    'emailStatus' => 'sent',
                    'emailType' => $request->emailType ?? 'hrm',
                ]);

                if (!$createEmail) {
                    return response()->json(['error' => 'An error occur while creating email!'], 404);
                }

                $this->MailStructure->JobApplicationStatusMail($jobApplication->email, $mailData);

                return response()->json(['message' => 'Job Application  Status Changed successfully'], 200);
            } else {
                $deletedJobApplication = JobApplication::where('id', $id)
                    ->update([
                        'status' => $request->input('status'),
                    ]);

                if (!$deletedJobApplication) {
                    return response()->json(['error' => 'Failed to delete jobApplication '], 404);
                }
                return response()->json(['message' => 'Job Application  deleted successfully'], 200);
            }
        } catch (Exception $err) {
            dd($err->getMessage());   
            return response()->json(['error' => 'An error occurred during deleting jobApplication , please try again later'], 500);
        }
    }
}
