<?php

namespace App\Http\Controllers\HR\JobApplication;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobType;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobTypeController extends Controller
{
    //create a single jobType controller method
    public function createJobType(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedJobType = JobType::destroy($ids);

                $deletedCount = [
                    'count' => $deletedJobType,
                ];

                return response()->json($deletedCount, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during deleting job Type, please try again later'], 500);
            }
        } elseif ($request->query('query') === 'createmany') {
            try {
                $jobTypeData = json_decode($request->getContent(), true);
                $createdJobType = collect($jobTypeData)->map(function ($item) {
                    return JobType::firstOrCreate([
                        'jobTypeName' => $item['jobTypeName'],
                    ]);
                });

                $converted = arrayKeysToCamelCase($createdJobType->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating job Type, please try again later'], 500);
            }
        } else {
            try {
                // $jobTypeData = JobType::where('jobTypeName', $request->input('jobTypeName'))
                //     ->first();
                $existingJobType = JobType::where('jobTypeName', $request->input('jobTypeName'))->first();

                if ($existingJobType) {
                    // Return an error if the designation already exists
                    return response()->json(
                        [
                            'error' => 'The job type with name "' . $request->input('jobTypeName') . '" already exists.',
                        ],
                        409,
                    );
                }
                $createdJobType = JobType::firstOrCreate([
                    'jobTypeName' => $request->input('jobTypeName'),
                ]);

                $converted = arrayKeysToCamelCase($createdJobType->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating job Type, please try again later'], 500);
            }
        }
    }

    // get all jobType controller method
    public function getAllJobType(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllJobType = JobType::orderBy('id', 'desc')->where('status', 'true')->get();

                $converted = arrayKeysToCamelCase($getAllJobType->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job type, please try again later'], 500);
            }
        } elseif ($request->query('query') === 'search') {
            try {
                $pagination = getPagination($request->query());
                $key = trim($request->query('key'));

                $getAllJobType = JobType::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)->orWhere('jobTypeName', 'LIKE', '%' . $key . '%');
                })
                    ->where('status', 'true')
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobTypeCount = JobType::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)->orWhere('jobTypeName', 'LIKE', '%' . $key . '%');
                })
                    ->where('status', 'true')
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobType->toArray());
                $finalResult = [
                    'getAllJobType' => $converted,
                    'totalJobType' => $getAllJobTypeCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job type, please try again later'], 500);
            }
        } elseif ($request->query()) {
            try {
                $pagination = getPagination($request->query());

                $getAllJobType = JobType::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobTypeCount = JobType::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })->count();

                $converted = arrayKeysToCamelCase($getAllJobType->toArray());
                $finalResult = [
                    'getAllJobType' => $converted,
                    'totalJobType' => $getAllJobTypeCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job type, please try again later'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid query!'], 400);
        }
    }

    // get a single jobType controller method
    public function getSingleJobType(Request $request, $id): JsonResponse
    {
        try {
            $getSingleJobType = JobType::where('id', $id)->first();

            if (!$getSingleJobType) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $converted = arrayKeysToCamelCase($getSingleJobType->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting job type, please try again later'], 500);
        }
    }

    // update a single jobType controller method
    public function updateJobType(Request $request, $id): JsonResponse
    {
        try {
            $existingJobType = JobType::where('jobTypeName', $request->input('jobTypeName'))->first();

            if ($existingJobType) {
                // Return an error if the designation already exists
                return response()->json(
                    [
                        'error' => 'The job type with name "' . $request->input('jobTypeName') . '" already exists.',
                    ],
                    409,
                );
            }
            
            $updatedJobType = JobType::where('id', $id)->update([
                'jobTypeName' => $request->input('jobTypeName'),
            ]);

            if (!$updatedJobType) {
                return response()->json(['error' => 'Failed to update job type'], 404);
            }
            return response()->json(['message' => 'Job type updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updating job type, please try again later'], 500);
        }
    }

    // delete a single jobType controller method
    public function deleteJobType(Request $request, $id): JsonResponse
    {
        try {
            $deletedJobType = JobType::where('id', $id)->update([
                'status' => $request->input('status'),
            ]);

            if (!$deletedJobType) {
                return response()->json(['error' => 'Failed to delete job type'], 404);
            }
            return response()->json(['message' => 'Job type deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting job type, please try again later'], 500);
        }
    }
}
