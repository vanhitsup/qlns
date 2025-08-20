<?php

namespace App\Http\Controllers\HR\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\SalaryHistory;
use App\Models\Users;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HrmDashboardController extends Controller
{
    public function getDashboardData(): JsonResponse
    {
        try {
            // Total user count
            $userCount = Users::where('status', 'true')->count();

            // Calculate total salary
            $userSalary = SalaryHistory::orderBy('id', 'desc')->get();
            $salary = 0;
            foreach ($userSalary as $value) {
                $salary += $value->salary;
            }

            // Get the current date and time
            $today = Carbon::now();

            // Calculate the start and end time for the current day
            $startTime = Carbon::parse($today)->startOfDay()->format('Y-m-d');
            $endTime = Carbon::parse($today)->endOfDay()->format('Y-m-d');
            
            // Query the attendance table to get records for the current day
            $attendance = DB::table('attendance')->where('date', '=', $startTime)->get();
           

            // Calculate total unique users from attendance
            $todayPresent = count($attendance->unique('userId'));

            // Query the leaveApplication table to count users on leave for today
            $todayOnLeave = DB::table('leaveApplication')->where('acceptLeaveFrom', '<=', $endTime)->where('acceptLeaveTo', '>=', $startTime)->where('status', '=', 'ACCEPTED')->count();

            // Calculate total absent users
            $todayAbsent = $userCount - $todayPresent - $todayOnLeave;

            // Get start and end dates from the request query parameters
            $startDate = Carbon::parse(request('startDate'));
            $endDate = Carbon::parse(request('endDate'));

            // Query the attendance table to get work hours between the start and end dates
            $workHours = DB::table('attendance')->where('inTime', '>=', $startDate)->where('inTime', '<=', $endDate)->get();

            // Calculate totalHour for each day
            $workHoursDateWise = [];
            foreach ($workHours as $user) {
                $date = Carbon::parse($user->inTime)->format('Y-m-d');

                // Convert totalHour from HH:MM:SS to total seconds
                [$hours, $minutes, $seconds] = explode(':', $user->totalHour);
                $totalSeconds = $hours * 3600 + $minutes * 60 + $seconds;

                if (isset($workHoursDateWise[$date])) {
                    $workHoursDateWise[$date] += $totalSeconds;
                } else {
                    $workHoursDateWise[$date] = $totalSeconds;
                }
            }

            // Convert the associative array to the desired format
            $workHoursByDate = [];
            foreach ($workHoursDateWise as $date => $totalSeconds) {
                // Convert total seconds back to HH:MM:SS
                $hours = floor($totalSeconds / 3600);
                $minutes = floor(($totalSeconds % 3600) / 60);
                $seconds = $totalSeconds % 60;

                // Format the time as HH:MM:SS
                $formattedTime = sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);

                $workHoursByDate[] = [
                    'type' => 'Work hours',
                    'date' => Carbon::parse($date)->toDateString(),
                    'time' => $formattedTime, // Store time in HH:MM:SS format
                ];
            }

            // Prepare the final data array
            $data = [
                'totalUsers' => $userCount,
                'totalSalary' => $salary,
                'todayPresent' => $todayPresent,
                'todayOnLeave' => $todayOnLeave,
                'todayAbsent' => $todayAbsent,
                'workHoursByDate' => $workHoursByDate,
            ];

            return response()->json($data);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }
}
