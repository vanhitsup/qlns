<?php

namespace App\Http\Controllers\HR\Holiday;

use App\Http\Controllers\Controller;
use App\Models\WeeklyHoliday;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WeeklyHolidayController extends Controller
{
    //create a weeklyHoliday controller method
    public function createSingleWeeklyHoliday(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedManyWeeklyHoliday = WeeklyHoliday::destroy($ids);

                $deletedCounted = [
                    'count' => $deletedManyWeeklyHoliday,
                ];

                return response()->json($deletedCounted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during deleting many Weekly Holiday. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'createmany') {
            try {
                $weeklyHolidayData = json_decode($request->getContent(), true);

                $createdWeeklyHoliday = collect($weeklyHolidayData)->map(function ($holiday) {
                    return WeeklyHoliday::firstOrCreate([
                        'name' => $holiday['name'],
                        'startDay' => $holiday['startDay'],
                        'endDay' => $holiday['endDay'],
                    ]);
                });

                return response()->json(['count' => count($createdWeeklyHoliday)], 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating many Weekly Holiday. Please try again later.'], 500);
            }
        } else {
            try {
                $weeklyHolidayData = json_decode($request->getContent(), true);

                $createdWeeklyHoliday =  WeeklyHoliday::create([
                    'name' => $weeklyHolidayData['name'],
                    'startDay' => $weeklyHolidayData['startDay'],
                    'endDay' => $weeklyHolidayData['endDay'],
                ]);

                $converted = arrayKeysToCamelCase($createdWeeklyHoliday->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating a single Weekly Holiday. Please try again later.'], 500);
            }
        }
    }

    // get weeklyHoliday controller method
    public function getAllWeeklyHoliday(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllWeeklyHoliday = WeeklyHoliday::orderBy('id', 'asc')
                    ->with('user')
                    ->where('status', 'true')
                    ->get();

                $modifiedData = $getAllWeeklyHoliday->map(function ($data) {
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
                return response()->json(['error' => 'An error occurred during getting Weekly Holiday. Please try again later.'], 500);
            }
        } else if ($request->query('status')) {
            try {
                $pagination = getPagination($request->query());

                $getAllWeeklyHoliday = WeeklyHoliday::orderBy('id', 'asc')
                    ->with('user')
                    ->where('status', $request->query('status'))
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $modifiedData = $getAllWeeklyHoliday->map(function ($data) {
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
                    'getAllWeeklyHoliday' => $converted,
                    'totalWeeklyHoliday' => WeeklyHoliday::where('status', $request->query('status'))->count(),
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting Weekly Holiday. Please try again later.'], 500);
            }
        } else if ($request->query()) {
            try {
                $pagination = getPagination($request->query());

                $getAllWeeklyHoliday = WeeklyHoliday::orderBy('id', 'asc')
                    ->with('user')
                    ->where('status', 'true')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $modifiedData = $getAllWeeklyHoliday->map(function ($data) {
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
                    'getAllWeeklyHoliday' => $converted,
                    'totalWeeklyHoliday' => WeeklyHoliday::where('status', 'true')->count(),
                ];

                return response()->json($aggregation, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting Weekly Holiday. Please try again later.'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid Query!'], 400);
        }
    }

    // get a single weeklyHoliday controller method
    public function getSingleWeeklyHoliday(Request $request, $id): jsonResponse
    {
        try {
            $getSingleWeeklyHoliday = WeeklyHoliday::where('id', $id)
                ->with('user')
                ->first();

            if (!$getSingleWeeklyHoliday) {
                return response()->json(['error' => 'Weekly Holiday not found!'], 404);
            }

            $users =  $getSingleWeeklyHoliday->user->map(function ($user) {
                return [
                    'id' => $user->id,
                    'firstName' => $user->firstName,
                    'lastName' => $user->lastName,
                    'username' => $user->username,
                ];
            });
            $getSingleWeeklyHoliday->setRelation('user', $users);

            $converted = arrayKeysToCamelCase($getSingleWeeklyHoliday->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting Weekly Holiday. Please try again later.'], 500);
        }
    }

    // update a single weeklyHoliday controller method
    public function updateSingleWeeklyHoliday(Request $request, $id): JsonResponse
    {
        try {
            $updatedWeeklyHoliday = WeeklyHoliday::where('id', $id)->update([
                'name' => $request->input('name'),
                'startDay' => $request->input('startDay'),
                'endDay' => $request->input('endDay'),
            ]);

            if (!$updatedWeeklyHoliday) {
                return response()->json(['error' => 'Failed to update Weekly Holiday!'], 404);
            }
            return response()->json(['message' => 'WeeklyHoliday updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updating Weekly Holiday. Please try again later.'], 500);
        }
    }

    // delete a single weeklyHoliday controller method
    public function deleteSingleWeeklyHoliday(Request $request, $id): JsonResponse
    {
        try {
            $deletedWeeklyHoliday = WeeklyHoliday::where('id', $id)
                ->delete();

            if ($deletedWeeklyHoliday) {
                return response()->json(['message' => 'WeeklyHoliday Deleted Successfully'], 200);
            } else {
                return response()->json(['error' => 'Failed to delete Weekly Holiday!'], 404);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting Weekly Holiday. Please try again later.'], 500);
        }
    }
}
