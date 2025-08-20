<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\PublicHoliday;
use App\Models\Users;
use Carbon\Carbon;
use App\Models\Payslip;
use Database\Seeders\EmploymentSeeder;

class CalculatePayslipService
{
    protected function getHolidaysInMonth(int $year, int $month, string $startDay, string $endDay): int
    {
        $dayNameToIndex = [
            'Sunday' => 0,
            'Monday' => 1,
            'Tuesday' => 2,
            'Wednesday' => 3,
            'Thursday' => 4,
            'Friday' => 5,
            'Saturday' => 6,
        ];

        $startDayIndex = $dayNameToIndex[$startDay];
        $endDayIndex = $dayNameToIndex[$endDay];

        $firstDay = Carbon::create($year, $month, 1);
        $lastDay = $firstDay->copy()->endOfMonth();

        $holidayCount = 0;

        // Iterate through all days in the month
        for ($day = $firstDay; $day->lte($lastDay); $day->addDay()) {
            $dayOfWeek = $day->dayOfWeek;

            // Check if the day is within the weekly holiday range
            if ($startDayIndex <= $endDayIndex) {
                // Normal range (e.g., Monday to Friday)
                if ($dayOfWeek >= $startDayIndex && $dayOfWeek <= $endDayIndex) {
                    $holidayCount++;
                }
            } else {
                // Wrapping range (e.g., Friday to Monday)
                if ($dayOfWeek >= $startDayIndex || $dayOfWeek <= $endDayIndex) {
                    $holidayCount++;
                }
            }
        }

        return $holidayCount;
    }
    function countPublicHolidays($startDate, $endDate)
    {
        $startDate = Carbon::parse($startDate);
        $endDate = Carbon::parse($endDate);

        // Fetch overlapping holidays using Eloquent
        $holidays = PublicHoliday::where('status', 'true')
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween('startDate', [$startDate, $endDate])
                    ->orWhereBetween('endDate', [$startDate, $endDate])
                    ->orWhere(function ($subquery) use ($startDate, $endDate) {
                        $subquery->where('startDate', '<=', $startDate)
                            ->where('endDate', '>=', $endDate);
                    });
            })
            ->get(['startDate', 'endDate']);

        // Calculate the total overlapping days
        $totalDays = $holidays->reduce(function ($carry, $holiday) use ($startDate, $endDate) {
            $holidayStart = Carbon::parse($holiday->startDate);
            $holidayEnd = Carbon::parse($holiday->endDate);

            $overlapStart = $holidayStart->greaterThanOrEqualTo($startDate) ? $holidayStart : $startDate;
            $overlapEnd = $holidayEnd->lessThanOrEqualTo($endDate) ? $holidayEnd : $endDate;

            return $carry + $overlapStart->diffInDays($overlapEnd) + 1; // Include both start and end dates
        }, 0);

        return $totalDays;
    }
    public function calculatePayslip(int $salaryMonth, int $salaryYear)
    {
        $startDate = Carbon::create($salaryYear, $salaryMonth, 1);

        $endDate = $startDate->copy()->endOfMonth();


        $publicHolidayCount = $this->countPublicHolidays($startDate, $endDate);

        $employees = Users::with([
            'employmentStatus',
            'weeklyHoliday',
            'shift',
            'leaveApplication' => fn($query) => $query->where('status', 'ACCEPTED')
                ->whereBetween('acceptLeaveFrom', [$startDate, $endDate]),
        ])
            ->whereHas('salaryHistory', fn($query) =>
                    $query->whereMonth('startDate', '<=', $salaryMonth)
                        ->whereYear('startDate', '<=', $salaryYear))
            ->whereDoesntHave('payslip', fn($query) => $query->where('salaryMonth', $salaryMonth)->where('salaryYear', $salaryYear))
            ->get();

        $result = $employees->filter(fn($emp) => isset($emp->salaryHistory[0]->salary) && $emp->salaryHistory[0]->salary > 0)
            ->map(function ($employee) use ($startDate, $endDate, $publicHolidayCount, $salaryMonth, $salaryYear) {

                $daysInMonth = Carbon::createFromDate($salaryYear, $salaryMonth)->daysInMonth;
                $baseSalary = $employee->salaryHistory[0]->salary ?? 0;
                $paidLeaveCount = $employee->leaveApplication->where('leaveType', 'PAID')->sum('leaveDuration');
                $unpaidLeaveCount = $employee->leaveApplication->where('leaveType', 'UNPAID')->sum('leaveDuration');
                $weekendCount = $employee->weeklyHoliday
                    ? $this->getHolidaysInMonth(
                        $salaryYear,
                        $salaryMonth,
                        $employee->weeklyHoliday->startDay,
                        $employee->weeklyHoliday->endDay
                    )
                    : 0;


                if ($employee->employmentStatus->isHolidayPaid === "true" && $employee->employmentStatus->isWeekendPaid === "true") {
                    $workingDays = $daysInMonth;
                } else if ($employee->employmentStatus->isHolidayPaid === "true" && $employee->employmentStatus->isWeekendPaid === "false") {
                    $workingDays = $daysInMonth - $weekendCount;
                } else if ($employee->employmentStatus->isHolidayPaid === "false" && $employee->employmentStatus->isWeekendPaid === "true") {
                    $workingDays = $daysInMonth - $publicHolidayCount;
                } else if ($employee->employmentStatus->isHolidayPaid === "false" && $employee->employmentStatus->isWeekendPaid === "false") {
                    $workingDays = $daysInMonth - $weekendCount - $publicHolidayCount;
                }

                $deduction = round(($baseSalary / $workingDays) * $unpaidLeaveCount);

                $perDaySalary = $baseSalary / $daysInMonth;

                $salaryPayable = round($perDaySalary * $workingDays);


                //hourly salary calculation for future enhancement
                $shiftWorkHours = round($employee->shift->workHour ?? 0, 2);
                $totalHolidays = $publicHolidayCount + $weekendCount;
                $monthlyWorkHours = round(($daysInMonth - $totalHolidays) * $shiftWorkHours, 2);
                $hourlySalary = $monthlyWorkHours ? round($baseSalary / $monthlyWorkHours, 2) : 0;
                $totalWorkHours = Attendance::where('userId', $employee->id)
                    ->whereBetween('inTime', [$startDate, $endDate])
                    ->sum('totalHour') / 10000;

                // if ($employee->salaryMode === 'hourly') {
                //     $salaryPayable = round(
                //         ($totalWorkHours * $hourlySalary) + ($paidLeaveCount * $shiftWorkHours * $hourlySalary),
                //         2
                //     );
                // } else {
                //     $workDays = $daysInMonth - $totalHolidays;
                //     $salaryPayable = round(($baseSalary / $daysInMonth) * $workDays, 2);
                // }

                return [
                    'userId' => $employee->id,
                    'firstName' => $employee->firstName,
                    'lastName' => $employee->lastName,
                    'salaryMonth' => $salaryMonth,
                    'salaryYear' => $salaryYear,
                    'salary' => $baseSalary,
                    'paidLeave' => $paidLeaveCount,
                    'unpaidLeave' => $unpaidLeaveCount,
                    'monthlyHoliday' => $totalHolidays,
                    'publicHoliday' => $publicHolidayCount,
                    'workDay' => $workingDays,
                    'shiftWiseWorkHour' => $shiftWorkHours,
                    'monthlyWorkHour' => $monthlyWorkHours,
                    'hourlySalary' => $hourlySalary,
                    'bonus' => 0,
                    'bonusComment' => "",
                    'deduction' => $deduction,
                    'deductionComment' => "",
                    'workingHour' => $totalWorkHours,
                    'startDate' => $startDate,
                    'endDate' => $endDate,
                    'totalWorkHour' => $totalWorkHours,
                    'salaryPayable' => $salaryPayable,
                ];
            });

        return $result->values()->all();
    }
}
