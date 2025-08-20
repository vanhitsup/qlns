<?php

namespace App\Http\Controllers\HR\JobApplication;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\SkillsByJob;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobController extends Controller
{
    //create a single job controller method
    public function createJob(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedJob = Job::destroy($ids);

                $deletedCount = [
                    'count' => $deletedJob,
                ];

                return response()->json($deletedCount, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during deleting job , please try again later'], 500);
            }
        } else {
            try {
                $createdJob = Job::create([
                    'companyId' => 1,
                    'jobTitle' => $request->input('jobTitle'),
                    'jobDescription' => $request->input('jobDescription'),
                    'jobRequirement' => $request->input('jobRequirement'),
                    'jobLocationId' => $request->input('jobLocationId'),
                    'jobCategoryId' => $request->input('jobCategoryId'),
                    'totalPosition' => $request->input('totalPosition'),
                    'startTime' => Carbon::parse($request->input('startTime')),
                    'endTime' => Carbon::parse($request->input('endTime')),
                    'jobTypeId' => $request->input('jobTypeId'),
                    'jobWorkExperienceId' => $request->input('jobWorkExperienceId'),
                    'jobPayBy' => $request->input('jobPayBy'),
                    'startingSalary' => $request->input('startingSalary'),
                    'maximumSalary' => $request->input('maximumSalary'),
                    'exactSalary' => $request->input('exactSalary'),
                    'jobPaySystem' => $request->input('jobPaySystem'),
                ]);

                if ($createdJob) {
                    collect($request->input('jobSkillId'))->map(function ($item) use ($createdJob) {
                        return SkillsByJob::create([
                            'jobId' => $createdJob->id,
                            'jobSkillId' => $item
                        ]);
                    });
                }

                $converted = arrayKeysToCamelCase($createdJob->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating job , please try again later', $err->getMessage()], 500);
            }
        }
    }

    // get all job controller method
    public function getAllJob(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllJob = Job::orderBy('id', 'desc')
                    ->with('company:id,companyName', 'jobLocation', 'jobCategory')
                    ->where('status', 'true')
                    ->get();

                $converted = arrayKeysToCamelCase($getAllJob->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job , please try again later'], 500);
            }
        } else if ($request->query('query') === 'search') {
            try {
                $pagination = getPagination($request->query());
                $key = trim($request->query('key'));

                $getAllJob = Job::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)
                        ->orWhere('jobTitle', 'LIKE', '%' . $key . '%');
                })
                    ->where('status', 'true')
                    ->with('jobLocation', 'jobType', 'jobCategory', 'jobSkills.jobSkills:id,jobSkillName')
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobCount = Job::where(function ($query) use ($key) {
                    return $query->orWhere('id', $key)
                        ->orWhere('jobTitle', 'LIKE', '%' . $key . '%');
                })
                    ->where('status', 'true')
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJob->toArray());
                $finalResult = [
                    'getAllJob' => $converted,
                    'totalJob' => $getAllJobCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job , please try again later'], 500);
            }
        } else if ($request->query()) {
            try {
                $pagination = getPagination($request->query());

                $getAllJob = Job::with('jobLocation', 'jobType', 'jobCategory', 'jobSkills.jobSkills:id,jobSkillName')
                    ->when($request->query('status'), function ($query) use ($request) {
                        return $query->whereIn('status', explode(',', $request->query('status')));
                    })
                    ->when($request->query('jobLocationId'), function ($query) use ($request) {
                        return $query->whereIn('jobLocationId', explode(',', $request->query('jobLocationId')));
                    })
                    ->when($request->query('jobCategoryId'), function ($query) use ($request) {
                        return $query->whereIn('jobCategoryId', explode(',', $request->query('jobCategoryId')));
                    })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $getAllJobCount = Job::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    
                    ->when($request->query('jobLocationId'), function ($query) use ($request) {
                        return $query->whereIn('jobLocationId', explode(',', $request->query('jobLocationId')));
                    })
                    ->when($request->query('jobCategoryId'), function ($query) use ($request) {
                        return $query->whereIn('jobCategoryId', explode(',', $request->query('jobCategoryId')));
                    })
                    ->count();

                $converted = arrayKeysToCamelCase($getAllJob->toArray());
                $finalResult = [
                    'getAllJob' => $converted,
                    'totalJob' => $getAllJobCount,
                ];
                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting job , please try again later'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid query!'], 400);
        }
    }

    // get a single job controller method
    public function getSingleJob(Request $request, $id): JsonResponse
    {
        try {
            $getSingleJob = Job::where('id', $id)
                ->with('company:id,companyName,address,email,phone', 'jobLocation', 'jobType', 'jobCategory', 'jobWorkExperience', 'jobSkills.jobSkills:id,jobSkillName')
                ->first();

            if (!$getSingleJob) {
                return response()->json(['error' => 'Not Found!'], 404);
            }

            $converted = arrayKeysToCamelCase($getSingleJob->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting job , please try again later', $err->getMessage()], 500);
        }
    }

    // update a single job controller method
    public function updateJob(Request $request, $id): JsonResponse
    {
        try {
            $updatedJob = Job::where('id', $id)
                ->update([
                    'companyId' => 1,
                    'jobTitle' => $request->input('jobTitle'),
                    'jobDescription' => $request->input('jobDescription'),
                    'jobRequirement' => $request->input('jobRequirement'),
                    'jobLocationId' => $request->input('jobLocationId'),
                    'jobCategoryId' => $request->input('jobCategoryId'),
                    'totalPosition' => $request->input('totalPosition'),
                    'startTime' => Carbon::parse($request->input('startTime')),
                    'endTime' => Carbon::parse($request->input('endTime')),
                    'jobTypeId' => $request->input('jobTypeId'),
                    'jobWorkExperienceId' => $request->input('jobWorkExperienceId'),
                    'jobPayBy' => $request->input('jobPayBy'),
                    'startingSalary' => $request->input('startingSalary'),
                    'maximumSalary' => $request->input('maximumSalary'),
                    'exactSalary' => $request->input('exactSalary'),
                    'jobPaySystem' => $request->input('jobPaySystem'),
                ]);

            if (!$updatedJob) {
                return response()->json(['error' => 'Failed to update job '], 404);
            }
            return response()->json(['message' => 'Job  updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updating job , please try again later'], 500);
        }
    }

    // delete a single job controller method
    public function deleteJob(Request $request, $id): JsonResponse
    {
        try {
            $deletedJob = Job::where('id', $id)
                ->update([
                    'status' => $request->input('status'),
                ]);

            if (!$deletedJob) {
                return response()->json(['error' => 'Failed to delete job '], 404);
            }
            return response()->json(['message' => 'Job  deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting job , please try again later'], 500);
        }
    }
}
