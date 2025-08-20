<?php

namespace App\Http\Controllers\HR\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Users;
use Illuminate\Support\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    //create a single attendance controller method
    public function createAttendance(Request $request): JsonResponse
    {
        if ($request->query('query') === 'createmany') {
            try {
                $attendanceData = json_decode($request->getContent(), true);
        
                // Validate input structure
                if (!is_array($attendanceData)) {
                    return response()->json(['error' => 'Invalid input'], 400);
                }
        
                // Use collection to map over the attendance data and create new attendance entries
                $createdAttendance = collect($attendanceData)->map(function ($attendance) {
        
                    $user = Users::where('username', $attendance['username'])->first();
                    if (!$user) {
                        throw new Exception($attendance['username'] . ' username not found');
                    }
        
                    $userShift = $user->shift;
                    if (!$userShift) {
                        throw new Exception('User shift not found for User ID ' . $user->id);
                    }
        
                    // Convert dataset times to 24-hour format
                    $inTime = Carbon::createFromFormat('d-m-Y h:i A', $attendance['inTime'])->format('Y-m-d H:i:s');
                    $outTime = Carbon::createFromFormat('d-m-Y h:i A', $attendance['outTime'])->format('Y-m-d H:i:s');
        
                    // Parse shift times for comparison
                    $shiftStartTime = Carbon::parse($userShift->startTime)->format('H:i:s');
                    $shiftEndTime = Carbon::parse($userShift->endTime)->format('H:i:s');
                    $date = Carbon::createFromFormat('Y-m-d H:i:s', $inTime)->format('Y-m-d');
        
                    // Determine status for in and out times based on user shift
                    $isInEarlyForManual = Carbon::parse($inTime)->format('H:i:s') < $shiftStartTime;
                    $isInLateForManual = Carbon::parse($inTime)->format('H:i:s') > $shiftStartTime;
                    $inTimeStatus = $isInEarlyForManual ? "Early" : ($isInLateForManual ? "Late" : "On Time");
        
                    $isOutEarlyForManual = Carbon::parse($outTime)->format('H:i:s') < $shiftEndTime;
                    $isOutLateForManual = Carbon::parse($outTime)->format('H:i:s') > $shiftEndTime;
                    $outTimeStatus = $isOutEarlyForManual ? "Early" : ($isOutLateForManual ? "Late" : "On Time");
        
                    // Calculate total worked hours
                    $diffInMinutes = Carbon::parse($outTime)->diffInMinutes(Carbon::parse($inTime));
        
                    // Ensure the difference is non-negative
                    if ($diffInMinutes < 0) {
                        // Handle case where outTime is before inTime (e.g., spanning midnight)
                        $diffInMinutes += 24 * 60; // Add 24 hours in minutes
                    }
        
                    $hours = floor($diffInMinutes / 60);
                    $minutes = $diffInMinutes % 60;
        
                    // Create the total hours in HH:MM:SS format
                    $totalHours = sprintf('%02d:%02d:%02d', $hours, $minutes, 0); // Assuming seconds are 0
        
                    // Create the attendance entry
                    return Attendance::create([
                        'userId' => $user->id,
                        'inTime' => $inTime,
                        'outTime' => $outTime,
                        'date' => $date,
                        'punchBy' => 1,
                        'inTimeStatus' => $inTimeStatus,
                        'outTimeStatus' => $outTimeStatus,
                        'comment' => $attendance['comment'] ?? null,
                        'ip' => $attendance['ip'] ?? null,
                        'totalHour' => $totalHours, // Store total hour in HH:MM:SS format
                    ]);
                })->filter(); // Filter out any null results
        
                $converted = arrayKeysToCamelCase($createdAttendance->toArray());
        
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return $this->badRequest($err->getMessage());
            }
        }
        
         else {
            try {
                $tokenData = $request->attributes->get('data');
                $userId = (int)$request->input('userId');

                // Find the user and load their shift
                $user = Users::where('id', $userId)->with('shift')->first();
                if (!$user) return $this->notFound('User not found');
                if (!$user->shift) return $this->notFound('User shift not found');

                $currentTime = Carbon::now();
                $isLate = $currentTime->gt($user->shift->startTime);
                $isEarly = $currentTime->lt($user->shift->startTime);
                $isOnTime = $currentTime->gte($user->shift->startTime);

                if($isLate){
                    $inTimeStatus = "Late";
                }elseif($isEarly){
                    $inTimeStatus = "Early";
                }elseif($isOnTime){
                    $inTimeStatus = "On Time";
                }
  

                // Check if there is an existing attendance entry without an outTime
                $attendance = Attendance::where('userId', $userId)->whereNull('outTime')->first();

                if ($request->query('query') === 'manualPunch') {
                    // Manual punch logic
                    $inTime = Carbon::createFromFormat('H:i:s', Carbon::parse($request->input('inTime'))->format('H:i:s'));
                    $outTime = Carbon::createFromFormat('H:i:s', Carbon::parse($request->input('outTime'))->format('H:i:s'));
                    
                    $date = Carbon::parse($request->input('inTime'))->format('Y-m-d');
                   
                    // Format shift start and end times to extract only the time
                    $userStartTime = Carbon::createFromFormat('H:i:s', Carbon::parse($user->shift->startTime)->format('H:i:s'));
                    $userEndTime = Carbon::createFromFormat('H:i:s', Carbon::parse($user->shift->endTime)->format('H:i:s'));
                    
                    $isInLateForManual = $inTime->gt($userStartTime);
                    $isInEarlyForManual = $inTime->lt($userStartTime);
                    $isOntimeForInTime = $inTime->gte($userStartTime);

                    $isOutEarlyForManual = $outTime->lt($userEndTime);
                    $isOutLateForManual = $outTime->gt($userEndTime);
                    $isOntimeForOutTime = $outTime->gte($userEndTime);

                    if($isInLateForManual){
                        $inTimeStatus = "Late";
                    }elseif($isInEarlyForManual){
                        $inTimeStatus = "Early";
                    }elseif($isOntimeForInTime){
                        $inTimeStatus = "On Time";
                    }

                    if($isOutLateForManual){
                        $outTimeStatus = "Late";
                    }elseif($isOutEarlyForManual){
                        $outTimeStatus = "Early";
                    }elseif($isOntimeForOutTime){
                        $outTimeStatus = "On Time";
                    }


                    // Calculate total worked hours
                    $diffInMinutes = $outTime->diffInMinutes($inTime);

                    // Ensure the difference is non-negative
                    if ($diffInMinutes < 0) {
                        $diffInMinutes += 24 * 60; // add 24 hours in minutes
                    }

                    $hours = floor($diffInMinutes / 60);
                    $minutes = $diffInMinutes % 60;

                    // Create the total hours in HH:MM:SS format
                    $totalHours = sprintf('%02d:%02d:%02d', $hours, $minutes, 0); // Assuming seconds are 0


                    // Create a new attendance entry for manual punch
                    $newAttendance = Attendance::create([
                        'userId' => $userId,
                        'inTime' => $inTime,
                        'outTime' => $outTime,
                        'date' => $date,
                        'punchBy' => $tokenData['sub'],
                        'inTimeStatus' => $inTimeStatus,
                        'outTimeStatus' => $outTimeStatus,
                        'comment' => $request->input('comment') ?? null,
                        'ip' => $request->input('ip') ?? null,
                        'totalHour' => Carbon::parse($totalHours)->format('H:i:s'),
                    ]);

                    // Convert the keys to camel case and return response
                    $converted = arrayKeysToCamelCase($newAttendance->toArray());
                    return response()->json($converted, 201);
                } 
                
                
                elseif ($attendance === null) {
                    // Create a new attendance record if no existing one is found
                    $inTime = Carbon::now();

                    $date = Carbon::parse($request->input('inTime'))->format('Y-m-d');
                    $newAttendance = Attendance::create([
                        'userId' => $userId,
                        'inTime' => $inTime,
                        'date' => $date,
                        'outTime' => null,
                        'punchBy' => $tokenData['sub'],
                        'inTimeStatus' => $inTimeStatus,
                        'outTimeStatus' => null,
                        'comment' => $request->input('comment') ?? null,
                        'ip' => $request->input('ip') ?? null,
                    ]);

                    $converted = arrayKeysToCamelCase($newAttendance->toArray());
                    return response()->json($converted, 201);
                } else {
                    // Update the existing attendance record with outTime and total hours
                    $outTime = Carbon::now();
                    $inTime = Carbon::parse($attendance->inTime);

                    $isOutEarly = $outTime->lt($user->shift->endTime);
                    $isOutLate = $outTime->gt($user->shift->endTime);
                    $isOntimeForOutTime = $outTime->gte($user->shift->endTime);

                    if($isOutLate){
                        $outTimeStatus = "Late";
                    }elseif($isOutEarly){
                        $outTimeStatus = "Early";
                    }elseif($isOntimeForOutTime){
                        $outTimeStatus = "On Time";
                    }



                    $diffInMinutes = abs($outTime->diffInMinutes($inTime));
                    $hours = floor($diffInMinutes / 60);
                    $minutes = $diffInMinutes % 60;
                    $totalHours = $hours + ($minutes / 60);

                    // Update the attendance entry with outTime and total hours
                    $attendance->update([
                        'outTime' => $outTime,
                        'totalHour' => (float)round($totalHours, 3),
                        'outTimeStatus' => $outTimeStatus,
                    ]);

                    $converted = arrayKeysToCamelCase($attendance->toArray());
                    return response()->json($converted, 201);
                }
            } catch (Exception $err) {
                return $this->badRequest($err);
            }
        }
    }

    // get all the attendance controller method
    public function getAllAttendance(Request $request): JsonResponse
    {
        $data = $request->attributes->get('data');

        if ($data['role'] !== 'super-admin') {
            return $this->forbidden('You are not allowed to access this route');
        }

        if ($request->query('query') === 'all') {
            try {
                $getAllAttendance = Attendance::with('user:id,firstName,lastName')
                    ->where('status', 'true')
                    ->orderBy('id', 'desc')
                    ->get();

                $result = collect($getAllAttendance)->map(function ($attendance) {
                    $punchBy = Users::where('id', $attendance->punchBy)->select('id', 'firstName', 'lastName')->get();

                    return $attendance->setRelation('punchBy', $punchBy);
                });

                $converted = arrayKeysToCamelCase($result->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting announcement. Please try again later.'], 500);
            }
        } else if ($request->query()) {
            try {
                $pagination = getPagination($request->query());
                $startDate = Carbon::parse($request->query('startdate'));
                $endDate = Carbon::parse($request->query('enddate'));

                $getAllAttendance = Attendance::with('user:id,firstName,lastName')
                    ->when($request->query('startdate') && $request->query('enddate'), function ($query) use ($endDate, $startDate) {
                        return $query->where('inTime', '>=', $startDate)
                            ->where('inTime', '<=', $endDate);
                    })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $result = collect($getAllAttendance)->map(function ($attendance) {
                    $punchBy = Users::where('id', $attendance->punchBy)->select('id', 'firstName', 'lastName')->get();
                    return $attendance->setRelation('punchBy', $punchBy);
                });

                $converted = arrayKeysToCamelCase($result->toArray());
                $aggregation = [
                    'getAllAttendance' => $converted,
                    'totalAttendance' => Attendance::where('status', 'true')->count(),
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting attendance. Please try again later.'], 500);
            }
        }
    }

    // get a single attendance controller method
    public function getSingleAttendance(Request $request, $id): JsonResponse
    {
        try {
            $data = $request->attributes->get('data');
            $getSingleAttendance = Attendance::with('user:id,firstName,lastName,email')
                ->where('id', $id)
                ->first();

            $punchBy = Users::where('id', $getSingleAttendance->punchBy)->select('id', 'firstName', 'lastName')->first();
            $getSingleAttendance->setRelation('punchBy', $punchBy);
            $converted = arrayKeysToCamelCase($getSingleAttendance->toArray());

            if (
                $data['role'] !== 'super-admin'
                || $data['sub'] !== $getSingleAttendance->userId
            ) {
                return $this->forbidden('You are not allowed to access this route');
            }

            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting single attendance. Please try again later.'], 500);
        }
    }

    // get attendance by userId controller method
    public function getAttendanceByUserId(Request $request, $userId): JsonResponse
    {
        if ($request->query()) {
            try {
                $pagination = getPagination($request->query());
                $getAllAttendanceByUserId = Attendance::with('user:id,firstName,lastName')
                    ->where('userId', $userId)
                    ->orderBy('id', 'asc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $result = collect($getAllAttendanceByUserId)->map(function ($attendance) {
                    $punchBy = Users::where('id', $attendance->punchBy)->select('id', 'firstName', 'lastName')->get();
                    return $attendance->setRelation('punchBy', $punchBy);
                });

                $converted = arrayKeysToCamelCase($result->toArray());
                $aggregation = [
                    'getAllAttendanceByUserId' => $converted,
                    'totalAttendanceByUserId' => Attendance::where('userId', $userId)->count(),
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return $this->badRequest($err->getMessage());
            }
        } else {
            try {
                $getAllAttendanceByUserId = Attendance::with('user:id,firstName,lastName')
                    ->where('userId', $userId)
                    ->orderBy('id', 'asc')
                    ->get();

                $result = collect($getAllAttendanceByUserId)->map(function ($attendance) {
                    $punchBy = Users::where('id', $attendance->punchBy)->select('id', 'firstName', 'lastName')->get();
                    return $attendance->setRelation('punchBy', $punchBy);
                });

                $converted = arrayKeysToCamelCase($result->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return $this->badRequest($err->getMessage());
            }
        }
    }

    // get last attendance by userId
    public function getLastAttendanceByUserId(Request $request, $userId): JsonResponse
    {
        try {
            $lastAttendance = Attendance::orderBy('id', 'desc')
                ->where('userId', $userId)
                ->first();

            if (!$lastAttendance) {
                return response()->json(null, 200);
            }

            $converted = arrayKeysToCamelCase($lastAttendance->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return $this->badRequest($err->getMessage());
        }
    }
}
