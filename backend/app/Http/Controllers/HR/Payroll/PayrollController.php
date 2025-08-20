<?php

namespace App\Http\Controllers\HR\Payroll;

use App\Http\Controllers\Controller;
use App\Mail\Sendmail;
use App\Models\AppSetting;
use App\Models\EmailConfig;
use App\Models\Payslip;
use App\Models\Transaction;
use App\Services\CalculatePayslipService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class PayrollController extends Controller
{
    protected CalculatePayslipService $calculatePayslipService;

    public function __construct(CalculatePayslipService $calculatePayslip)
    {
        $this->calculatePayslipService = $calculatePayslip;
    }

    //calculate payroll
    public function calculatePayroll(Request $request): JsonResponse
    {
        try {
            $salaryMonth = $request->query('salaryMonth');
            $salaryYear = $request->query('salaryYear');

            $result = $this->calculatePayslipService->calculatePayslip($salaryMonth, $salaryYear);

            return response()->json($result, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting Payslip. Please try again later.'], 500);
        }
    }

    public function generatePayslip(Request $request): JsonResponse
    {
        try {
            $salaryMonth = $request->query('salaryMonth');
            $salaryYear = $request->query('salaryYear');

            //check month and year in not future date
            // if (Carbon::createFromDate($salaryYear, $salaryMonth)->isFuture()) {
            //     return response()->json(['error' => 'Future date not allowed.'], 400);
            // }

            if (!$salaryMonth || !$salaryYear) {
                return response()->json(['error' => 'Missing salary month or year.'], 400);
            }

            $data = json_decode($request->getContent(), true);
            if (empty($data)) {
                return response()->json(['error' => 'No data found.'], 400);
            }
            $createdPayslips = collect($data)->map(function ($item) {
                return Payslip::create([
                    'userId' => $item['userId'],
                    'salaryMonth' => $item['salaryMonth'],
                    'salaryYear' => $item['salaryYear'],
                    'salary' => $item['salary'],
                    'paidLeave' => $item['paidLeave'],
                    'unpaidLeave' => $item['unpaidLeave'],
                    'monthlyHoliday' => $item['monthlyHoliday'],
                    'publicHoliday' => $item['publicHoliday'],
                    'workDay' => $item['workDay'],
                    'shiftWiseWorkHour' => $item['shiftWiseWorkHour'],
                    'monthlyWorkHour' => $item['monthlyWorkHour'],
                    'hourlySalary' => $item['hourlySalary'],
                    'workingHour' => $item['workingHour'],
                    'salaryPayable' => $item['totalPayable'],
                    'bonus' => $item['bonus'],
                    'bonusComment' => $item['bonusComment'],
                    'deduction' => $item['deduction'],
                    'deductionComment' => $item['deductionComment'],
                    'totalPayable' => $item['totalPayable'],
                    'totalDueAmount' => $item['totalPayable'],
                    'paymentStatus' => 'UNPAID',
                ]);
            });

            return response()->json(
                [
                    'message' => 'Payslips generated successfully',
                    'data' => $createdPayslips,
                ],
                200,
            );
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred while generating the payslip. Please try again later.'], 500);
        }
    }

    // get all the payslip controller method
    public function getAllPayslip(Request $request): JsonResponse
    {
        // try {
        //     //order by id desc
        //     $payslips = Payslip::with('user')
        //         ->orderBy('id', 'desc')
        //         ->get();

        //     if ($payslips->isEmpty()) {
        //         return response()->json(['message' => 'No payslips found.'], 404);
        //     }

        //     return response()->json([
        //         'message' => 'Payslips retrieved successfully.',
        //         'data' => $payslips,
        //     ], 200);
        // } catch (Exception $err) {
        //     Log::error('Error retrieving payslips: ' . $err->getMessage());
        //     return response()->json(['error' => 'An error occurred while retrieving the payslips. Please try again later.'], 500);
        // }

        if ($request->query('value') === 'monthWise') {
            $pagination = getPagination($request->query());
            $paymentStatus = $request->query('paymentStatus');
            $salaryMonth = $request->query('salaryMonth');
            $salaryYear = $request->query('salaryYear') ?? Carbon::now()->year;
            try {
                $allPayslip = Payslip::with('user:id,firstName,lastName', 'transactions')
                    ->when($salaryMonth, fn($query) => $query->whereIn('salaryMonth', explode(',', $salaryMonth)))
                    ->when($salaryYear, fn($query) => $query->whereIn('salaryYear', explode(',', $salaryYear)))
                    ->when($paymentStatus, fn($query) => $query->whereIn('paymentStatus', explode(',', $paymentStatus)))
                    ->when($request->query('userId'), function ($query, $userId) {
                        $userIds = is_array($userId) ? $userId : explode(',', $userId);
                        return $query->whereIn('userId', $userIds);
                    })

                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $totalPayslip = Payslip::when($salaryMonth, fn($query) => $query->whereIn('salaryMonth', explode(',', $salaryMonth)))->when($salaryYear, fn($query) => $query->whereIn('salaryYear', explode(',', $salaryYear)))->when($paymentStatus, fn($query) => $query->whereIn('paymentStatus', explode(',', $paymentStatus)))->when($request->query('userId'), fn($query) => $query->whereIn('userId', explode(',', $request->query('userId'))))->count();
 //    add a new element inside allPayslip which name is totalPaidAmount and value is salaryPayable - totalDueAmount
                $allPayslip->map(function ($payslip) {
                    $payslip->totalPaidAmount = $payslip->salaryPayable - $payslip->totalDueAmount;
                    return $payslip;
                });

                $converted = arrayKeysToCamelCase($allPayslip->toArray());
           
                   
                $aggregation = [
                    'getAllPayslip' => $converted,
                    'totalPayslip' => $totalPayslip,
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting Payslip. Please try again later.'], 500);
            }
        } else {
            try {
                $pagination = getPagination($request->query());
                $paymentStatus = $request->query('paymentStatus');

                $allPayslip = Payslip::with('user:id,firstName,lastName', 'transactions')
                    ->when($request->query('userId'), function ($query, $userId) {
                        $userIds = is_array($userId) ? $userId : explode(',', $userId);
                        return $query->whereIn('userId', $userIds);
                    })
                    ->when($paymentStatus, fn($query) => $query->whereIn('paymentStatus', explode(',', $paymentStatus)))

                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();
                    $allPayslip->map(function ($payslip) {
                        $payslip->totalPaidAmount = $payslip->salaryPayable - $payslip->totalDueAmount;
                        return $payslip;
                    });

     
                    

                $converted = arrayKeysToCamelCase($allPayslip->toArray());
               
                $aggregation = [
                    'getAllPayslip' => $converted,
                    'totalPayslip' => Payslip::count(),
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting Payslip. Please try again later.'], 500);
            }
        }
    }

    // get a single payslip controller method
    public function getSinglePayslip(Request $request, $id): JsonResponse
    {
        try {
            $singlePayslip = Payslip::with('user.designation','user.department', 'transactions')
            ->where('id', (int) $id)
            ->first();

            unset($singlePayslip->user->password);

            $converted = arrayKeysToCamelCase($singlePayslip->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting Payslip. Please try again later.'], 500);
        }
    }

    // update payslip controller method
    public function updatePayslip(Request $request, $id): JsonResponse
    {
        try {
            $payslip = Payslip::where('id', (int) $id)->first();

            if ($payslip->paymentStatus === 'PAID') {
                return response()->json(['error' => 'Payslip already Paid'], 400);
            }

            $payslip->update($request->all());

            $updatedPayslip = Payslip::where('id', (int) $id)->with('user')->first();

            $converted = arrayKeysToCamelCase($updatedPayslip->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting Payslip. Please try again later.'], 500);
        }
    }

    // make payment controller method
    public function makePayment(Request $request, $id): JsonResponse
    {
        try {
            $payslip = Payslip::where('id', (int) $id)->first();

            if ($payslip->paymentStatus === 'PAID') {
                return response()->json(['error' => 'Payslip already Paid'], 400);
            }

            $oldDueAmount = $payslip->totalDueAmount;

            $amount = 0;

            foreach ($request->paidAmount as $amountData) {
                $amount += $amountData['amount'];
            }

            if ($this->takeUptoThreeDecimal($oldDueAmount) < $amount) {
                return response()->json(['error' => 'Paid amount is greater than due amount!'], 400);
            }

            $newDueAmount = $oldDueAmount - $amount;

            // $transaction = Transaction::create([
            //     'userId' => $request->userId,
            //     'amount' => $request->amount,
            //     'debitId' => 10,
            //     'creditId' => $request->accountId,
            //     'particulars' => $request->amount.' paid as salary by '. $request->userId,
            //     'type' => 'SALARY',
            //     'date' => Carbon::parse($request->date),
            // ]);

            foreach ($request->paidAmount as $amountData) {
                if ($amountData['amount'] > 0) {
                    $transaction = Transaction::create([
                        'userId' => $payslip->userId,
                        'debitId' => 10,
                        'creditId' => $amountData['paymentType'] ? $amountData['paymentType'] : 1,
                        'amount' => $amountData['amount'],
                        'particulars' => "Received payment due of Payslip #{$payslip->id}",
                        'type' => 'SALARY',
                        'relatedId' => $payslip->id,
                        'date' => Carbon::parse($request->date),
                    ]);
                }
            }

            if ($newDueAmount < $oldDueAmount && $newDueAmount > 0) {
                $payslip->paymentStatus = 'DUE';
                $payslip->totalDueAmount = $newDueAmount;
                $payslip->save();
            }

            if ($newDueAmount == 0) {
                $payslip->paymentStatus = 'PAID';
                $payslip->totalDueAmount = 0;
                $payslip->save();
            } else {
                $payslip->totalDueAmount = $newDueAmount;
                $payslip->save();
            }
            // $emailConfig = EmailConfig::where('type', 'PAYSLIP')->first();
            // $appSetting = AppSetting::first();

            // if ($emailConfig && $appSetting) {
            //     $data = [
            //         'name' => $payslip->user->name,
            //         'email' => $payslip->user->email,
            //         'subject' => $emailConfig->subject,
            //         'body' => $emailConfig->body,
            //         'amount' => $payslip->totalPayable,
            //         'transactionDate' => $transaction->transactionDate,
            //         'appSetting' => $appSetting,
            //     ];

            //     Mail::to($payslip->user->email)->send(new Sendmail($data));
            // }

            return response()->json(
                [
                    'message' => 'Payments recorded successfully',
                ],
                200,
            );
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during making payment. Please try again later.'], 500);
        }
    }

    // get payslip transaction by user id controller method
    public function getPayslipTransactionByUserId(Request $request, $id): JsonResponse
    {
        try {
            $payslips = Payslip::with('transactions', 'transactions.debit', 'transactions.credit')->where('userId', (int) $id)->orderBy('id', 'desc')->get();

            $allTransactions = $payslips->pluck('transactions')->flatten();

            $payslips->each(function ($payslip) {
                unset($payslip->transactions);
            });

            if ($payslips->isEmpty()) {
                return response()->json(['message' => 'No payslips found.'], 404);
            }
            $converted = arrayKeysToCamelCase($payslips->toArray());

            $result = [
                'payslips' => $converted,
                'transactions' => $allTransactions,
            ];
            return response()->json($result, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred while retrieving the payslips. Please try again later.'], 500);
        }
    }
}
