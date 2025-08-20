<?php

namespace App\Http\Controllers\HR\LeaveApplication;

use App\Http\Controllers\Controller;
use App\Models\LeavePolicy;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeavePolicyController extends Controller
{
    //create leavePolicy controller method
    public function createSingleLeavePolicy(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedLeavePolicy = LeavePolicy::destroy($ids);

                $deletedCounted = [
                    'count' => $deletedLeavePolicy,
                ];

                return response()->json($deletedCounted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during delete LeavePolicy. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'createmany') {
            try {
                $leavePolicyData = json_decode($request->getContent(), true);

                $createdLeavePolicy = collect($leavePolicyData)->map(function ($policy) {
                    return LeavePolicy::firstOrCreate([
                        'name' => $policy['name'],
                        'paidLeaveCount' => (int) $policy['paidLeaveCount'],
                        'unpaidLeaveCount' => (int) $policy['unpaidLeaveCount'],
                    ]);
                });

                return response()->json(['count' => count($createdLeavePolicy)], 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create LeavePolicy. Please try again later.'], 500);
            }
        } else {
            try {
                $leavePolicyData = json_decode($request->getContent(), true);

                $createdLeavePolicy = LeavePolicy::firstOrCreate([
                    'name' => $leavePolicyData['name'],
                    'paidLeaveCount' => (int) $leavePolicyData['paidLeaveCount'],
                    'unpaidLeaveCount' => (int) $leavePolicyData['unpaidLeaveCount'],
                ]);

                $converted = arrayKeysToCamelCase($createdLeavePolicy->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create LeavePolicy. Please try again later.'], 500);
            }
        }
    }

    // get all the leavePolicy controller method
    public function getAllLeavePolicy(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllLeavePolicy = LeavePolicy::orderBy('id', 'asc')
                    ->with('user')
                    ->where('status', 'true')
                    ->get();

                $modifiedData = $getAllLeavePolicy->map(function ($data) {
                    $users =  $data->user->map(function ($user) {
                        return [
                            'id' => $user->id,
                            'firstName' => $user->firstName,
                            'lastName' => $user->lastName,
                            'username' => $user->username,
                        ];
                    });
                    return $data->setRelation('user', $users);
                });

                $converted = arrayKeysToCamelCase($modifiedData->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting LeavePolicy. Please try again later.'], 500);
            }
        } else if ($request->query('status')) {
            $pagination = getPagination($request->query());
            try {
                $getAllLeavePolicy = LeavePolicy::orderBy('id', 'asc')
                    ->with('user')
                    ->when($request->query('status'), function ($query) use ($request) {
                        return $query->whereIn('status', explode(',', $request->query('status')));
                    })
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $modifiedData = $getAllLeavePolicy->map(function ($data) {
                    $users =  $data->user->map(function ($user) {
                        return [
                            'id' => $user->id,
                            'firstName' => $user->firstName,
                            'lastName' => $user->lastName,
                            'username' => $user->username,
                        ];
                    });
                    return $data->setRelation('user', $users);
                });

                $converted = arrayKeysToCamelCase($modifiedData->toArray());
                $aggregation = [
                    'getAllLeavePolicy' => $converted,
                    'totalLeavePolicy' => LeavePolicy::where('status', $request->query('status'))->count(),
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting LeavePolicy. Please try again later.'], 500);
            }
        } else if ($request->query()) {
            $pagination = getPagination($request->query());
            try {
                $getAllLeavePolicy = LeavePolicy::orderBy('id', 'asc')
                    ->with('user')
                    ->when($request->query('status'), function ($query) use ($request) {
                        return $query->whereIn('status', explode(',', $request->query('status')));
                    })
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $modifiedData = $getAllLeavePolicy->map(function ($data) {
                    $users =  $data->user->map(function ($user) {
                        return [
                            'id' => $user->id,
                            'firstName' => $user->firstName,
                            'lastName' => $user->lastName,
                            'username' => $user->username,
                        ];
                    });
                    return $data->setRelation('user', $users);
                });

                $converted = arrayKeysToCamelCase($modifiedData->toArray());
                $aggregation = [
                    'getAllLeavePolicy' => $converted,
                    'totalLeavePolicy' => LeavePolicy::where('status', 'true')->count(),
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting LeavePolicy. Please try again later.'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid Query!'], 400);
        }
    }

    // get a single LeavePolicy controller method
    public function getSingleLeavePolicy(Request $request, int $id): JsonResponse
    {
        try {
            $getSingleLeavePolicy = LeavePolicy::where('id', $id)
                ->with('user')
                ->first();

            $users =  $getSingleLeavePolicy->user->map(function ($user) {
                return [
                    'id' => $user->id,
                    'firstName' => $user->firstName,
                    'lastName' => $user->lastName,
                    'username' => $user->username,
                ];
            });
            $getSingleLeavePolicy->setRelation('user', $users);

            $converted = arrayKeysToCamelCase($getSingleLeavePolicy->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting LeavePolicy. Please try again later.'], 500);
        }
    }

    // update a single LeavePolicy controller method
    public function updateSingleLeavePolicy(Request $request, int $id): JsonResponse
    {
        try {
            $updatedSingleLeavePolicy = LeavePolicy::where('id', $id)->update($request->all());

            if (!$updatedSingleLeavePolicy) {
                return response()->json(['error' => 'Failed To Update LeavePolicy'], 404);
            }
            return response()->json(['message' => 'LeavePolicy updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during update LeavePolicy. Please try again later.'], 500);
        }
    }

    // delete a single LeavePolicy controller method
    public function deleteSingleLeavePolicy(Request $request, int $id): JsonResponse
    {
        try {
            $deletedLeavePolicy = LeavePolicy::where('id', $id)
                ->update(['status' => $request->input('status')]);

            if ($deletedLeavePolicy) {
                return response()->json(['message' => 'LeavePolicy Deleted Successfully'], 200);
            } else {
                return response()->json(['error' => 'Failed To Delete LeavePolicy'], 404);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting LeavePolicy. Please try again later.'], 500);
        }
    }
}
