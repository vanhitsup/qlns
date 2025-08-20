<?php

namespace App\Http\Controllers\HR\LeaveApplication;

use App\Http\Controllers\Controller;
use App\Mail\Sendmail;
use App\Models\AppSetting;
use App\Models\EmailConfig;
use App\Models\LeaveApplication;
use App\Models\Users;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;

class LeaveApplicationController extends Controller
{
    //create a leaveApplication controller method
    public function createSingleLeave(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedLeave = LeaveApplication::destroy($ids);

                $deletedCount = [
                    'count' => $deletedLeave,
                ];

                return response()->json($deletedCount, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during deleting LeaveApplication. Please try again later.'], 500);
            }
        } else {
            try {
                $leaveFrom = new DateTime($request->input('leaveFrom'));
                $leaveTo = new DateTime($request->input('leaveTo'));
                $leaveFrom->setTime(0, 0, 0);
                $leaveTo->setTime(0, 0, 0);
                $interval = $leaveFrom->diff($leaveTo);
                $leaveDuration = (int)$interval->format('%a') + 1;
   

                $createdLeave = LeaveApplication::create([
                    'userId' => $request->input('userId'),
                    'leaveType' => $request->input('leaveType'),
                    'leaveFrom' => $leaveFrom,
                    'leaveTo' => $leaveTo,
                    'leaveDuration' => $leaveDuration,
                    'reason' => $request->input('reason'),
                ]);

                $converted = arrayKeysToCamelCase($createdLeave->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create LeaveApplication. Please try again later.'], 500);
            }
        }
    }

    // get all the leaveApplication controller method
    public function getAllLeave(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllLeave = LeaveApplication::with('user:id,firstName,lastName')
                    ->orderBy('id', 'asc')
                    ->get();

                // get the acceptLeaveBy from user table and return the firstName and lastName into acceptLeaveBy and if acceptLeaveBy is null then return null into acceptLeaveBy for that object
                $result = $getAllLeave->map(function ($item) {
                    if ($item->acceptLeaveBy) {
                        $user = Users::select('id', 'firstName', 'lastName')
                            ->where('id', $item->acceptLeaveBy)
                            ->first();

                        $item->acceptLeaveBy = $user;
                    } else {
                        $item->acceptLeaveBy = null;
                    }
                    return $item;
                });

                $converted = arrayKeysToCamelCase($result->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting LeaveApplication. Please try again later.'], 500);
            }
        } elseif ($request->query('status')) {
            $pagination = getPagination($request->query());
            try {
                $getAllLeave = LeaveApplication::with('user:id,firstName,lastName')
                    ->orderBy('id', 'asc')
                    ->whereIn(
                        'status',
                        explode(',', $request->query('status'))
                    )
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                // get the acceptLeaveBy from user table and return the firstName and lastName into acceptLeaveBy and if acceptLeaveBy is null then return null into acceptLeaveBy for that object
                $result = $getAllLeave->map(function ($item) {
                    if ($item->acceptLeaveBy) {
                        $user = Users::select('id', 'firstName', 'lastName')
                            ->where('id', $item->acceptLeaveBy)
                            ->first();

                        $item->acceptLeaveBy = $user;
                    } else {
                        $item->acceptLeaveBy = null;
                    }
                    return $item;
                });

                $converted = arrayKeysToCamelCase($result->toArray());
                $aggregation = [
                    'getAllLeave' => $converted,
                    'totalLeave' => LeaveApplication::where('status', $request->query('status'))->count(),
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting LeaveApplication. Please try again later.'], 500);
            }
        } elseif ($request->query()) {
            try {
                $pagination = getPagination($request->query());
                $getAllLeave = LeaveApplication::with('user:id,firstName,lastName')
                    ->orderBy('id', 'asc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                // get the acceptLeaveBy from user table and return the firstName and lastName into acceptLeaveBy and if acceptLeaveBy is null then return null into acceptLeaveBy for that object
                $result = $getAllLeave->map(function ($item) {
                    if ($item->acceptLeaveBy) {
                        $user = Users::select('id', 'firstName', 'lastName')
                            ->where('id', $item->acceptLeaveBy)
                            ->first();

                        $item->acceptLeaveBy = $user;
                    } else {
                        $item->acceptLeaveBy = null;
                    }
                    return $item;
                });

                $converted = arrayKeysToCamelCase($result->toArray());
                $aggregation = [
                    'getAllLeave' => $converted,
                    'totalLeave' => LeaveApplication::count(),
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting LeaveApplication. Please try again later.'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid Query!'], 400);
        }
    }

    // get a single leaveApplication controller method
    public function getSingleLeave(Request $request, $id): JsonResponse
    {
        try {
            $getSingleLeave = LeaveApplication::with('user:id,firstName,lastName,username')
                ->where('id', (int)$id)
                ->first();

            if (!$getSingleLeave) {
                return response()->json(['error' => 'leave Note Found!'], 404);
            }

            if ($getSingleLeave->acceptLeaveBy) {
                $user = Users::select('id', 'firstName', 'lastName')
                    ->where('id', $getSingleLeave->acceptLeaveBy)
                    ->first();
                $getSingleLeave->acceptLeaveBy = $user;
            } else {
                $getSingleLeave->acceptLeaveBy = null;
            }

            $data = $request->attributes->get('data');
            $userData = Users::where('id', $data['sub'])->with('role')->first();
            $roleName = $userData->roleId;

            // user authentication system implemented here
            if ($roleName != 1) {
                if ($data['sub'] !== $getSingleLeave->userId) {
                    return response()->json(['error' => 'unauthorized!'], 401);
                } else if (!in_array(
                    'readAll-leaveApplication',
                    $data['permissions']
                ) || !in_array(
                    'readSingle-leaveApplication',
                    $data['permissions'],
                )) {
                    return response()->json(['error' => 'unauthorized!'], 401);
                }
            }

            $converted = arrayKeysToCamelCase($getSingleLeave->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting LeaveApplication. Please try again later.'], 500);
        }
    }

    // granted leave controller method
    public function grantedLeave(Request $request, $id): JsonResponse
    {
        try {
            $data = $request->attributes->get('data');
            $acceptLeaveFrom = new DateTime($request->input('acceptLeaveFrom'));
            $acceptLeaveTo = new DateTime($request->input('acceptLeaveTo'));

            $convertedAcceptLeaveFrom = Carbon::parse($acceptLeaveFrom)->format('Y-m-d');
            $convertedAcceptLeaveTo = Carbon::parse($acceptLeaveTo)->format('Y-m-d');
            $parsedAcceptLeaveFrom = Carbon::parse($convertedAcceptLeaveFrom);
            $parsedAcceptLeaveTo = Carbon::parse($convertedAcceptLeaveTo);
            $interval = $parsedAcceptLeaveFrom->diff($parsedAcceptLeaveTo);
            $leaveDuration = (int)$interval->format('%a') + 1;


            $grantedLeave = LeaveApplication::where('id', (int)$id)
                ->with('user:id,firstName,lastName,userName,email')
                ->first();
            $grantedLeave->update([
                'acceptLeaveBy' => $data['sub'],
                'acceptLeaveFrom' => $acceptLeaveFrom ?: null,
                'acceptLeaveTo' => $acceptLeaveTo ?: null,
                'acceptedLeaveDuration' => $leaveDuration ?: 0,
                'reviewComment' => $request->input('reviewComment') ?: null,
                'status' => $request->input('status'),
            ]);

            $acceptedByPerson = Users::where('id', $data['sub'])->select('id', 'firstName', 'lastName', 'userName', 'email')->first();

            if ($grantedLeave) {
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
                        'title' => "Leave Application",
                        "name" => $grantedLeave->user->firstName . " " . $grantedLeave->user->lastName,
                        "leaveType" => $grantedLeave->leaveType,
                        "acceptLeaveFrom" => Carbon::parse($grantedLeave->acceptLeaveFrom)->format('Y-m-d H-i:s'),
                        "acceptLeaveTo" => Carbon::parse($grantedLeave->acceptLeaveTo)->format('Y-m-d H:i:s'),
                        'leaveDuration' => $grantedLeave->leaveDuration,
                        'reviewComment' => $grantedLeave->reviewComment,
                        "acceptedBy" => $acceptedByPerson->firstName . " " . $acceptedByPerson->lastName,
                        'status' => $grantedLeave->status,
                        "body" => " ",
                        "companyName" => $companyName->companyName,
                    ];
                    Mail::to($grantedLeave->user->email)->send(new Sendmail($mailData));
                } catch (Exception $err) {
                    return response()->json(['error' => 'Failed to send email, SMTP not configured properly!'], 404);
                }
            }

            $converted = arrayKeysToCamelCase($grantedLeave->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting LeaveApplication. Please try again later.'], 500);
        }
    }

    // get leave by user id
    public function getLeaveByUserId(Request $request, $userId): JsonResponse
    {
        try {
            $pagination = getPagination($request->query());

            $getLeaveTo = LeaveApplication::where('userId', $userId)
                ->where('status', 'ACCEPTED')
                ->orderBy('id', 'desc')
                ->get();

            $isId = $getLeaveTo->map(function ($item) {
                return $item->id;
            });

            if (count($isId) === 0) {
                $finalResult = [
                    'getAllLeaveByUser' => [],
                    'totalLeaveByUser' => 0,
                    'leaveStatus' => ""
                ];

                return response()->json($finalResult, 200);
            }

            // check if the user is on leave
            $leaveTo = new DateTime($getLeaveTo[0]->leaveTo);
            $currentDate = new DateTime();

            $leaveStatus = "";

            if ($leaveTo > $currentDate) {
                $leaveStatus = "on leave";
            } else {
                $leaveStatus = "not on leave";
            }

            $singleLeave = LeaveApplication::where('userId', $userId)
                ->where('status', 'ACCEPTED')
                ->orderBy('id', 'desc')
                ->skip($pagination['skip'])
                ->take($pagination['limit'])
                ->get();

            $converted = arrayKeysToCamelCase($singleLeave->toArray());
            $finalResult = [
                'getAllLeaveByUser' => $converted,
                'totalLeaveByUser' => LeaveApplication::where('userId', $userId)
                    ->where('status', 'ACCEPTED')->count(),
                'leaveStatus' => $leaveStatus
            ];

            return response()->json($finalResult, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting LeaveApplication. Please try again later.'], 500);
        }
    }
}
