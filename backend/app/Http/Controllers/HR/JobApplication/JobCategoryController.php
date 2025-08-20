<?php

namespace App\Http\Controllers\HR\JobApplication;

use App\Http\Controllers\Controller;
use App\Models\JobCategory;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobCategoryController extends Controller
{
    //create a single jobCategory controller method
    public function createJobCategory(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedJobCategory = JobCategory::destroy($ids);

                $deletedCount = [
                    'count' => $deletedJobCategory,
                ];

                return response()->json($deletedCount, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during deleting job category, please try again later'], 500);
            }
        } elseif ($request->query('query') === 'createmany') {
            try {
                $jobCategoryData = json_decode($request->getContent(), true);

                $createdJobCategory = collect($jobCategoryData)->map(function ($item) {
                    return JobCategory::firstOrCreate([
                        'jobCategoryName' => $item['jobCategoryName'],
                    ]);
                });

                $converted = arrayKeysToCamelCase($createdJobCategory->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating job category, please try again later'], 500);
            }
        } else {
            try {
                $existingJobCategory = JobCategory::where('jobCategoryName', $request->input('jobCategoryName'))->first();

                if ($existingJobCategory) {
                    // Return an error if the designation already exists
                    return response()->json(
                        [
                            'error' => 'The job category with name "' . $request->input('jobCategoryName') . '" already exists.',
                        ],
                        409,
                    );
                }

                $createdJobCategory = JobCategory::firstOrCreate([
                    'jobCategoryName' => $request->input('jobCategoryName'),
                ]);

                $converted = arrayKeysToCamelCase($createdJobCategory->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating job category, please try again later'], 500);
            }
        }
    }

    // get all jobCategory controller method
    public function getAllJobCategory(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllJobCategory = JobCategory::orderBy('id', 'desc')->where('status', 'true')->get();

                $converted = arrayKeysToCamelCase($getAllJobCategory->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job category, please try again later'], 500);
            }
        } elseif ($request->query('query') === 'search') {
            try {
                $pagination = getPagination($request->query());
                $key = trim($request->query('key'));

                $getAllJobCategory = JobCategory::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)->orWhere('jobCategoryName', 'LIKE', '%' . $key . '%');
                })
                    ->where('status', 'true')
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobCategoryCount = JobCategory::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)->orWhere('jobCategoryName', 'LIKE', '%' . $key . '%');
                })
                    ->where('status', 'true')
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobCategory->toArray());
                $finalResult = [
                    'getAllJobCategory' => $converted,
                    'totalJobCategory' => $getAllJobCategoryCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job category, please try again later'], 500);
            }
        } elseif ($request->query()) {
            try {
                $pagination = getPagination($request->query());

                $getAllJobCategory = JobCategory::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobCategoryCount = JobCategory::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })->count();

                $converted = arrayKeysToCamelCase($getAllJobCategory->toArray());
                $finalResult = [
                    'getAllJobCategory' => $converted,
                    'totalJobCategory' => $getAllJobCategoryCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job category, please try again later'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid query!'], 400);
        }
    }

    // get a single jobCategory controller method
    public function getSingleJobCategory(Request $request, $id): JsonResponse
    {
        try {
            $getSingleJobCategory = JobCategory::where('id', $id)->first();

            if (!$getSingleJobCategory) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $converted = arrayKeysToCamelCase($getSingleJobCategory->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting job category, please try again later'], 500);
        }
    }

    // update a single jobCategory controller method
    public function updateJobCategory(Request $request, $id): JsonResponse
    {
        try {
            $existingJobCategory = JobCategory::where('jobCategoryName', $request->input('jobCategoryName'))->first();

            if ($existingJobCategory) {
                // Return an error if the designation already exists
                return response()->json(
                    [
                        'error' => 'The job category with name "' . $request->input('jobCategoryName') . '" already exists.',
                    ],
                    409,
                );
            }

            $updatedJobCategory = JobCategory::where('id', $id)->update([
                'jobCategoryName' => $request->input('jobCategoryName'),
            ]);

            if (!$updatedJobCategory) {
                return response()->json(['error' => 'Failed to update job category'], 404);
            }
            return response()->json(['message' => 'Job Category updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updating job category, please try again later'], 500);
        }
    }

    // delete a single jobCategory controller method
    public function deleteJobCategory(Request $request, $id): JsonResponse
    {
        try {
            $deletedJobCategory = JobCategory::where('id', $id)->update([
                'status' => $request->input('status'),
            ]);

            if (!$deletedJobCategory) {
                return response()->json(['error' => 'Failed to delete job category'], 404);
            }
            return response()->json(['message' => 'Job Category deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting job category, please try again later'], 500);
        }
    }
}
