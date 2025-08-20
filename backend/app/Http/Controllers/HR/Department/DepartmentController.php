<?php

namespace App\Http\Controllers\HR\Department;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Exception;
use App\Models\Department;
use App\Models\RolePermission;

//
class DepartmentController extends Controller
{
    //create department controller method
    public function createSingleDepartment(Request $request): jsonResponse
    {
        if ($request->query('query') === 'deletemanay') {
            try {
                // delete many department at once
                $data = json_decode($request->getContent(), true);
                $deletedDepartment = Department::destroy($data);

                $deletedCounted = [
                    'count' => $deletedDepartment,
                ];

                return response()->json($deletedCounted);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during delete department. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'createmany') {
            try {
                $departments = json_decode($request->getContent(), true);
                $createdDepartment = collect($departments)->map(function ($department) {
                    return Department::create([
                        'name' => $department['name'],
                    ]);
                });

                return $this->response($createdDepartment->toArray(), 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating department. Please try again later.'], 500);
            }
        } else {
            try {
                $existingDepartment = Department::where('name', $request->input('name'))->first();

                if ($existingDepartment) {
                    // Return an error if the designation already exists
                    return response()->json([
                        'error' => 'The department with name "' . $request->input('name') . '" already exists.'
                    ], 409);
                }
                $createdDepartment = Department::create([
                    'name' => $request->input('name'),
                ]);

                return $this->response($createdDepartment->toArray());
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating department. Please try again later.'], 500);
            }
        }
    }

    // get all the department controller method
    public function getAllDepartment(Request $request): jsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $allDepartment = Department::with(['user' => function ($query) {
                    $query->with('role')->orderBy('id', 'desc');
                }])
                    ->where('status', 'true')
                    ->orderBy('id', 'desc')
                    ->get();

                $allDepartment->transform(function ($department) {
                    $usersData = $department->user->map(function ($user) {
                        $role = $user->role;
                        return [
                            'id' => $user->id,
                            'firstName' => $user->firstName,
                            'lastName' => $user->lastName,
                            'username' => $user->username,
                            'role' => $role ? [
                                'id' => $role->id,
                                'name' => $role->name,
                            ] : null,
                        ];
                    });
                    $department->setRelation('users', $usersData);
                    return $department;
                });

                return $this->response($allDepartment->toArray());
            } catch (Exception $err) {
                return response()->json([$err], 500);
            }
        } elseif ($request->query('status') === 'false') {
            $pagination = getPagination($request->query());
            try {
                $allDepartment = Department::with(['user.role' => function ($query) {
                    $query->orderBy('id', 'desc');
                },])
                    ->when($request->query('status'), function ($query) use ($request) {
                        return $query->where('status', $request->query('status'));
                    })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $allDepartment->transform(function ($department) {
                    $usersData = $department->user->map(function ($user) {
                        $role = $user->role;
                        return [
                            'id' => $user->id,
                            'firstName' => $user->firstName,
                            'lastName' => $user->lastName,
                            'username' => $user->username,
                            'role' => $role ? [
                                'id' => $role->id,
                                'name' => $role->name,
                            ] : null,
                        ];
                    });
                    $department->setRelation('user', $usersData);
                    return $department;
                });

                return $this->response([
                    'getAllDepartment' => $allDepartment->toArray(),
                    'totalDepartment' => Department::where('status', 'true')->count(),
                ]);
            } catch (Exception $err) {
                return response()->json([$err], 500);
            }
        } elseif ($request->query()) {
            $pagination = getPagination($request->query());
            try {
                $allDepartment = Department::with(['user.role' => function ($query) {
                    $query->orderBy('id', 'desc');
                },])
                    ->when($request->query('status'), function ($query) use ($request) {
                        return $query->whereIn('status', explode(',', $request->query('status')));
                    })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $allDepartment->transform(function ($department) {
                    $usersData = $department->user->map(function ($user) {
                        $role = $user->role;
                        return [
                            'id' => $user->id,
                            'firstName' => $user->firstName,
                            'lastName' => $user->lastName,
                            'username' => $user->username,
                            'role' => $role ? [
                                'id' => $role->id,
                                'name' => $role->name,
                            ] : null,
                        ];
                    });
                    $department->setRelation('user', $usersData);
                    return $department;
                });

                return $this->response([
                    'getAllDepartment' => $allDepartment->toArray(),
                    'totalDepartment' => Department::where('status', 'true')->count(),
                ]);
            } catch (Exception $err) {

                return response()->json([$err], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid Query'], 400);
        }
    }

    // get a single department controller method
    public function getSingleDepartment(Request $request, $id): jsonResponse
    {
        try {
            $data = $request->attributes->get('data');
            $singleDepartment = Department::where('id', $id)->with(['users.role:id,name', 'users.designationHistory' => function ($query) {
                $query->orderBy('id', 'desc');
            }, 'users.designationHistory.designation:id,name'])->orderBy('id', 'desc')->get();

            $singleDepartment->transform(function ($department) {
                $userData = $department->user->map(function ($user) {
                    $role = $user->role;
                    $designationHistory = $user->designationHistory->first();
                    $designation = $designationHistory ? $designationHistory->designation : null;
                    return [
                        'id' => $user->id,
                        'firstName' => $user->firstName,
                        'lastName' => $user->lastName,
                        'username' => $user->username,
                        'role' => $role ? [
                            'id' => $role->id,
                            'name' => $role->name,
                        ] : [],
                        'designationHistory' => $designation ? [
                            [
                                'designation' => [
                                    'id' => $designation->id,
                                    'name' => $designation->name,
                                ]
                            ]
                        ] : [],
                    ];
                });
                $department->setRelation('users', $userData);
                return $department;
            });

            // make an array of unique usersId,
            $userIdArray = [];
            foreach ($singleDepartment[0]->user as $item) {
                $id = $item['id'];
                if (!in_array($id, $userIdArray)) {
                    $userIdArray[] = $id;
                }
            }

            //            $rolePermission = RolePermission::where('roleId', (int)$data['roleId'])
            //                ->with('permission')
            //                ->get();
            //            $permissionName = $rolePermission->map(function ($item) {
            //                return $item->permission->name;
            //            })->toArray();

            //            if (in_array($data['sub'], $userIdArray) && !(in_array('readAll-department', $permissionName) || !in_array('readSingle-department', $permissionName))) {
            //                return response()->json(['error' => 'unauthorized!'], 403);
            //            }
            $filteredSingleDepartment = $singleDepartment[0]->user->filter(function ($item) use ($data) {
                return $item['id'] === $data['sub'];
            });
            $singleDepartment[0]->setRelation('users', $filteredSingleDepartment);
            return $this->response($singleDepartment->toArray());
        } catch (Exception $err) {
            echo $err;
            return response()->json(['error' => 'An error occurred during getting department. Please try again later.'], 500);
        }
    }

    // update a single department controller method
    public function updateSingleDepartment(Request $request, $id): jsonResponse
    {
        try {
            // $existingDepartment = Department::where('name', $request->input('name'))->first();

            //     if ($existingDepartment) {
            //         // Return an error if the designation already exists
            //         return response()->json([
            //             'error' => 'The department with name "' . $request->input('name') . '" already exists.'
            //         ], 409);
            //     }

            $updatedDepartment = Department::where('id', $id)->update($request->all());

            if (!$updatedDepartment) {
                return response()->json(['error' => 'Failed to update Department!'], 404);
            }
            return response()->json(['message' => 'Department updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting single department. Please try again later.'], 500);
        }
    }

    // update a single department controller method
    public function deletedDepartment(Request $request, $id): jsonResponse
    {
        try {
            $deletedDepartment = Department::where('id', $id)->update([
                'status' => $request->input('status')
            ]);

            if ($deletedDepartment) {
                return response()->json(['message' => 'Department Deleted Successfully'], 200);
            } else {
                return response()->json(['error' => 'Failed To Delete Department'], 404);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting department. Please try again later.'], 500);
        }
    }
}
