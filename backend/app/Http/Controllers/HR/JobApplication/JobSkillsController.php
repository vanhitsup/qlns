<?php

namespace App\Http\Controllers\HR\JobApplication;

use App\Http\Controllers\Controller;
use App\Models\JobSkills;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobSkillsController extends Controller
{
    //create a single jobSkills controller method
    public function createJobSkills(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedJobSkills = JobSkills::destroy($ids);

                $deletedCount = [
                    'count' => $deletedJobSkills,
                ];

                return response()->json($deletedCount, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during deleting job Skills, please try again later'], 500);
            }
        } else if ($request->query('query') === 'createmany') {
            try {
                $jobSkillsData = json_decode($request->getContent(), true);

                $createdJobSkills = collect($jobSkillsData)->map(function ($item) {
                    return JobSkills::create([
                        'jobCategoryId' => $item['jobCategoryId'],
                        'jobSkillName' => $item['jobSkillName'],
                    ]);
                });

                $converted = arrayKeysToCamelCase($createdJobSkills->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating job Skills, please try again later'], 500);
            }
        } else {
            try {
                $jobSkillsData = JobSkills::where('jobSkillName', $request->input('jobSkillName'))
                    ->where('jobCategoryId', $request->input('jobCategoryId'))
                    ->first();
                
                if ($jobSkillsData) {
                    return response()->json(['error' => 'Job Skills already exists'], 400);
                }

                $createdJobSkills = JobSkills::create([
                    'jobCategoryId' => $request->input('jobCategoryId'),
                    'jobSkillName' => $request->input('jobSkillName')
                ]);

                $converted = arrayKeysToCamelCase($createdJobSkills->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating job Skills, please try again later'], 500);
            }
        }
    }

    // get all jobSkills controller method
    public function getAllJobSkills(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllJobSkills = JobSkills::orderBy('id', 'desc')
                    ->where('status', 'true')
                    ->get();

                $converted = arrayKeysToCamelCase($getAllJobSkills->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job Skills, please try again later'], 500);
            }
        } else if ($request->query('query') === 'search') {
            try {
                $pagination = getPagination($request->query());
                $key = trim($request->query('key'));

                $getAllJobSkills = JobSkills::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)
                        ->orWhere('jobSkillName', 'LIKE', '%' . $key . '%');
                })
                    ->where('status', 'true')
                    ->with('jobCategory')
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobSkillsCount = JobSkills::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)
                        ->orWhere('jobSkillName', 'LIKE', '%' . $key . '%');
                })
                    ->where('status', 'true')
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobSkills->toArray());
                $finalResult = [
                    'getAllJobSkills' => $converted,
                    'totalJobSkills' => $getAllJobSkillsCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job Skills, please try again later'], 500);
            }
        } else if ($request->query()) {
            try {
                $pagination = getPagination($request->query());

                $getAllJobSkills = JobSkills::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    ->when($request->query('jobCategoryId'), function ($query) use ($request) {
                        return $query->whereIn('jobCategoryId', explode(',', $request->query('jobCategoryId')));
                    })
                    ->with('jobCategory')
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobSkillsCount = JobSkills::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    ->when($request->query('jobCategoryId'), function ($query) use ($request) {
                        return $query->whereIn('jobCategoryId', explode(',', $request->query('jobCategoryId')));
                    })
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobSkills->toArray());
                $finalResult = [
                    'getAllJobSkills' => $converted,
                    'totalJobSkills' => $getAllJobSkillsCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job Skills, please try again later'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid query!'], 400);
        }
    }

    // get a single jobSkills controller method
    public function getSingleJobSkills(Request $request, $id): JsonResponse
    {
        try {
            $getSingleJobSkills = JobSkills::where('id', $id)
                ->with('jobCategory')
                ->first();

            if (!$getSingleJobSkills) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $converted = arrayKeysToCamelCase($getSingleJobSkills->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting job Skills, please try again later'], 500);
        }
    }

    // update a single jobSkills controller method
    public function updateJobSkills(Request $request, $id): JsonResponse
    {
        try {
            $updatedJobSkills = JobSkills::where('id', $id)
                ->update([
                    'jobCategoryId' => $request->input('jobCategoryId'),
                    'jobSkillName' => $request->input('jobSkillName')
                ]);

            if (!$updatedJobSkills) {
                return response()->json(['error' => 'Failed to update job Skills'], 404);
            }
            return response()->json(['message' => 'Job Skills updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updating job Skills, please try again later'], 500);
        }
    }

    // delete a single jobSkills controller method
    public function deleteJobSkills(Request $request, $id): JsonResponse
    {
        try {
            $deletedJobSkills = JobSkills::where('id', $id)
                ->update([
                    'status' => $request->input('status'),
                ]);

            if (!$deletedJobSkills) {
                return response()->json(['error' => 'Failed to delete job Skills'], 404);
            }
            return response()->json(['message' => 'Job Skills deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting job Skills, please try again later'], 500);
        }
    }

    // get all jobSkills by job CategoryId
    public function getAllJobSkillsByJobCategoryId(Request $request, $id): JsonResponse
    {
        try {
            $getAllJobSkills = JobSkills::where('jobCategoryId', $id)
                ->orderBy('id', 'desc')
                ->where('status', 'true')
                ->get();

            $converted = arrayKeysToCamelCase($getAllJobSkills->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting job Skills, please try again later'], 500);
        }
    }
}
