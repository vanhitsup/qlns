<?php

namespace App\Http\Controllers\HR\JobApplication;

use App\Http\Controllers\Controller;
use App\Models\JobLocation;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobLocationController extends Controller
{
    //create a single jobLocation controller method
    public function createJobLocation(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedJobLocation = JobLocation::destroy($ids);

                $deletedCount = [
                    'count' => $deletedJobLocation,
                ];

                return response()->json($deletedCount, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during deleting job Location, please try again later'], 500);
            }
        } else if ($request->query('query') === 'createmany') {
            try {
                $jobLocationData = json_decode($request->getContent(), true);

                $createdJobLocation = collect($jobLocationData)->map(function ($item) {
                    return JobLocation::create([
                        'countryName' => $item['countryName'],
                        'jobLocation' => $item['jobLocation'],
                    ]);
                });

                $converted = arrayKeysToCamelCase($createdJobLocation->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating job Location, please try again later'], 500);
            }
        } else {
            try {
                $jobLocationData = JobLocation::where('jobLocation', $request->input('jobLocation'))
                    ->where('countryName', $request->input('countryName'))
                    ->first();

                if ($jobLocationData) {
                    return response()->json(['error' => 'Job Location already exists'], 400);
                }
                $createdJobLocation = JobLocation::create([
                    'countryName' => $request->input('countryName'),
                    'jobLocation' => $request->input('jobLocation')
                ]);

                $converted = arrayKeysToCamelCase($createdJobLocation->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating job Location, please try again later'], 500);
            }
        }
    }

    // get all jobLocation controller method
    public function getAllJobLocation(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllJobLocation = JobLocation::orderBy('id', 'desc')
                    ->where('status', 'true')
                    ->get();

                $converted = arrayKeysToCamelCase($getAllJobLocation->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job Location, please try again later'], 500);
            }
        } else if ($request->query('query') === 'search') {
            try {
                $pagination = getPagination($request->query());
                $key = trim($request->query('key'));

                $getAllJobLocation = JobLocation::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)
                        ->orWhere('countryName', 'LIKE', '%' . $key . '%')
                        ->orWhere('jobLocation', 'LIKE', '%' . $key . '%');
                })
                    ->where('status', 'true')
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobLocationCount = JobLocation::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)
                        ->orWhere('countryName', 'LIKE', '%' . $key . '%')
                        ->orWhere('jobLocation', 'LIKE', '%' . $key . '%');
                })
                    ->where('status', 'true')
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobLocation->toArray());
                $finalResult = [
                    'getAllJobLocation' => $converted,
                    'totalJobLocation' => $getAllJobLocationCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job Location, please try again later'], 500);
            }
        } else if ($request->query()) {
            try {
                $pagination = getPagination($request->query());

                $getAllJobLocation = JobLocation::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    ->when($request->query('countryName'), function ($query) use ($request) {
                        return $query->whereIn('countryName', explode(',', $request->query('countryName')));
                    })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobLocationCount = JobLocation::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    ->when($request->query('countryName'), function ($query) use ($request) {
                        return $query->whereIn('countryName', explode(',', $request->query('countryName')));
                    })
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJobLocation->toArray());
                $finalResult = [
                    'getAllJobLocation' => $converted,
                    'totalJobLocation' => $getAllJobLocationCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job Location, please try again later'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid query!'], 400);
        }
    }

    // get a single jobLocation controller method
    public function getSingleJobLocation(Request $request, $id): JsonResponse
    {
        try {
            $getSingleJobLocation = JobLocation::where('id', $id)
                ->first();

            if (!$getSingleJobLocation) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $converted = arrayKeysToCamelCase($getSingleJobLocation->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting job Location, please try again later'], 500);
        }
    }

    // update a single jobLocation controller method
    public function updateJobLocation(Request $request, $id): JsonResponse
    {
        try {
            $updatedJobLocation = JobLocation::where('id', $id)
                ->update([
                    'countryName' => $request->input('countryName'),
                    'jobLocation' => $request->input('jobLocation')
                ]);

            if (!$updatedJobLocation) {
                return response()->json(['error' => 'Failed to update job Location'], 404);
            }
            return response()->json(['message' => 'Job Location updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updating job Location, please try again later'], 500);
        }
    }

    // delete a single jobLocation controller method
    public function deleteJobLocation(Request $request, $id): JsonResponse
    {
        try {
            $deletedJobLocation = JobLocation::where('id', $id)
                ->update([
                    'status' => $request->input('status'),
                ]);

            if (!$deletedJobLocation) {
                return response()->json(['error' => 'Failed to delete job Location'], 404);
            }
            return response()->json(['message' => 'Job Location deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting job Location, please try again later'], 500);
        }
    }
}
