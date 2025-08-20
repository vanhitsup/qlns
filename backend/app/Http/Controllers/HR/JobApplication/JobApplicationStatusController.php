<?php

namespace App\Http\Controllers\HR\JobApplication;

use App\Http\Controllers\Controller;
use App\Models\JobApplicationStatus;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobApplicationStatusController extends Controller
{
    //create a single job Application Status controller method
    public function createJobApplicationStatus(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedJobApplicationStatus = JobApplicationStatus::destroy($ids);

                $deletedCount = [
                    'count' => $deletedJobApplicationStatus,
                ];

                return response()->json($deletedCount, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during deleting job application Status, please try again later'], 500);
            }
        } else if ($request->query('query') === 'createmany') {
            try {
                $jobApplicationStatusData = json_decode($request->getContent(), true);

                $createdJobApplicationStatus = collect($jobApplicationStatusData)->map(function ($item) {
                    return JobApplicationStatus::firstOrCreate([
                        'applicationStatus' => $item['applicationStatus'],
                    ]);
                });

                $converted = arrayKeysToCamelCase($createdJobApplicationStatus->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return $this->badRequest($err->getMessage());
            }
        } else {
            try {
                $createdJobApplicationStatus = JobApplicationStatus::firstOrCreate([
                    'applicationStatus' => $request->input('applicationStatus')
                ]);

                $converted = arrayKeysToCamelCase($createdJobApplicationStatus->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating job application status, please try again later'], 500);
            }
        }
    }

    // get all job application status controller method
    public function getAllJobApplicationStatus(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllJobApplicationStatus = JobApplicationStatus::orderBy('id', 'asc')
                    ->with('jobApplication.job')
                    ->where('status', 'true')
                    ->get();

                $converted = arrayKeysToCamelCase($getAllJobApplicationStatus->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job application status, please try again later'], 500);
            }
        } else if ($request->query('query') === 'search') {
            try {
                $pagination = getPagination($request->query());
                $key = trim($request->query('key'));

                $getAllJobApplicationStatus = JobApplicationStatus::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)
                        ->orWhere('applicationStatus', 'LIKE', '%' . $key . '%');
                })
                    ->with('jobApplication.job')
                    ->where('status', 'true')
                    ->orderBy('id', 'asc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobApplicationStatusCount = JobApplicationStatus::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)
                        ->orWhere('applicationStatus', 'LIKE', '%' . $key . '%');
                })
                    ->where('status', 'true')
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobApplicationStatus->toArray());
                $finalResult = [
                    'getAllJobApplicationStatus' => $converted,
                    'totalJobApplicationStatus' => $getAllJobApplicationStatusCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job application status, please try again later'], 500);
            }
        } else if ($request->query()) {
            try {
                $pagination = getPagination($request->query());

                $getAllJobApplicationStatus = JobApplicationStatus::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    ->with('jobApplication.job')
                    ->orderBy('id', 'asc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobApplicationStatusCount = JobApplicationStatus::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobApplicationStatus->toArray());
                $finalResult = [
                    'getAllJobApplicationStatus' => $converted,
                    'totalJobApplicationStatus' => $getAllJobApplicationStatusCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job application status, please try again later'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid query!'], 400);
        }
    }

    // get a single job application controller method
    public function getSingleJobApplicationStatus(Request $request, $id): JsonResponse
    {
        try {
            $getSingleJobApplicationStatus = JobApplicationStatus::where('id', $id)
                ->with('jobApplication.job')
                ->first();

            if (!$getSingleJobApplicationStatus) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $converted = arrayKeysToCamelCase($getSingleJobApplicationStatus->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting job application status, please try again later'], 500);
        }
    }

    // update a single jobApplicationStatus controller method
    public function updateJobApplicationStatus(Request $request, $id): JsonResponse
    {
        try {
            $updatedJobApplicationStatus = JobApplicationStatus::where('id', $id)
                ->update([
                    'applicationStatus' => $request->input('applicationStatus'),
                ]);
            if (!$updatedJobApplicationStatus) {
                return response()->json(['error' => 'Failed to update job Application Status'], 404);
            }
            return response()->json(['message' => 'Job Application Status updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updating job Application Status, please try again later'], 500);
        }
    }

    // delete a single jobApplicationStatus controller method
    public function deleteJobApplicationStatus(Request $request, $id): JsonResponse
    {
        try {
            $deletedJobApplicationStatus = JobApplicationStatus::where('id', $id)->with('jobApplication')->first();
            if($deletedJobApplicationStatus->jobApplication->count() > 0) {
                return response()->json(['error' => 'Cannot delete job application status with job application'], 400);
            }
            
            $deletedJobApplicationStatus->status = $request->input('status');
            $deletedJobApplicationStatus->save();

            if (!$deletedJobApplicationStatus) {
                return response()->json(['error' => 'Failed to delete job application Status'], 404);
            }
            return response()->json(['message' => 'Job Application Status deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting job Application Status, please try again later'], 500);
        }
    }
}
