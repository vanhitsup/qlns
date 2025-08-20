<?php

namespace App\Http\Controllers\HR\JobApplication;

use App\Http\Controllers\Controller;
use App\Models\JobWorkExperience;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobWorkExperienceController extends Controller
{
    //create a single jobWorkExperience controller method
    public function createJobWorkExperience(Request $request): JsonResponse
    {
        try {
            $jobWorkExperienceData = JobWorkExperience::where('workExperience', $request->input('workExperience'))
                ->first();
            if ($jobWorkExperienceData) {
                return response()->json(['error' => 'Job WorkExperience already exists'], 400);
            }
            
            $createdJobWorkExperience = JobWorkExperience::firstOrCreate([
                'workExperience' => $request->input('workExperience')
            ]);

            $converted = arrayKeysToCamelCase($createdJobWorkExperience->toArray());
            return response()->json($converted, 201);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during creating job WorkExperience, please try again later'], 500);
        }
    }

    // get all jobWorkExperience controller method
    public function getAllJobWorkExperience(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllJobWorkExperience = JobWorkExperience::orderBy('id', 'desc')
                    ->where('status', 'true')
                    ->get();

                $converted = arrayKeysToCamelCase($getAllJobWorkExperience->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job WorkExperience, please try again later'], 500);
            }
        } else if ($request->query()) {
            try {
                $pagination = getPagination($request->query());

                $getAllJobWorkExperience = JobWorkExperience::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobWorkExperienceCount = JobWorkExperience::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobWorkExperience->toArray());
                $finalResult = [
                    'getAllJobWorkExperience' => $converted,
                    'totalJobWorkExperience' => $getAllJobWorkExperienceCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job type, please try again later'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid query!'], 400);
        }
    }

    // get a single jobWorkExperience controller method
    public function getSingleJobWorkExperience(Request $request, $id): JsonResponse
    {
        try {
            $getSingleJobWorkExperience = JobWorkExperience::where('id', $id)
                ->first();

            if (!$getSingleJobWorkExperience) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $converted = arrayKeysToCamelCase($getSingleJobWorkExperience->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting job WorkExperience, please try again later'], 500);
        }
    }

    // update a single jobWorkExperience controller method
    public function updateJobWorkExperience(Request $request, $id): JsonResponse
    {
        try {
            $updatedJobWorkExperience = JobWorkExperience::where('id', $id)
                ->update([
                    'workExperience' => $request->input('workExperience')
                ]);

            if (!$updatedJobWorkExperience) {
                return response()->json(['error' => 'Failed to update job WorkExperience'], 404);
            }
            return response()->json(['message' => 'Job WorkExperience updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updating job WorkExperience, please try again later'], 500);
        }
    }

    // delete a single jobWorkExperience controller method
    public function deleteJobWorkExperience(Request $request, $id): JsonResponse
    {
        try {
            $deletedJobWorkExperience = JobWorkExperience::where('id', $id)
                ->update([
                    'status' => $request->input('status'),
                ]);

            if (!$deletedJobWorkExperience) {
                return response()->json(['error' => 'Failed to delete job WorkExperience'], 404);
            }
            return response()->json(['message' => 'Job WorkExperience deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting job WorkExperience, please try again later'], 500);
        }
    }
}
