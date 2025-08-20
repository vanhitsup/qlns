<?php

namespace App\Http\Controllers\Settings\Discount;

use App\Http\Controllers\Controller;
use Exception;
use App\Models\Discount;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    public function createSingleDiscount(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {

                $data = json_decode($request->getContent(), true);
                $deletedDiscount = Discount::destroy($data);

                $deletedCounted = [
                    'count' => $deletedDiscount,
                ];
                return response()->json($deletedCounted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during deleting many Discount. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'createmany') {
            try {
                $discountData = $request->json()->all();
                $createdDiscount = collect($discountData)->map(function ($discount) {
                    return Discount::create([
                        'value' => $discount['value'],
                        'type' => $discount['type'],
                        'startDate' => $discount['startDate'],
                        'endDate' => $discount['endDate']
                    ]);
                });

                return $this->response($createdDiscount->toArray(), 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating many Discount. Please try again later.'], 500);
            }
        } else {
            try {
                $createdDiscount = Discount::create([
                    'value' => $request->input('value'),
                    'type' => $request->input('type'),
                    'startDate' => $request->input('startDate'),
                    'endDate' => $request->input('endDate')
                ]);

                return $this->response($createdDiscount->toArray(), 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating Discount. Please try again later.'], 500);
            }
        }
    }

    public function getAllDiscount(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $discount = Discount::where('status', 'true')->orderBy('id', 'desc')->get();
                return $this->response($discount->toArray());
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting all Discount. Please try again later.'], 500);
            }
        } else if ($request->query()) {
            try {
                $pagination = getPagination($request->query());
                $discount = Discount::when($request->query('status'), function ($query) use ($request) {
                    return $query->whereIn('status', explode(',', $request->query('status')));
                })
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();
                $totaldiscount = Discount::where('status', $request->input('status'))->count();

                $finalResult = [
                    'getAllDiscount' => $discount->toArray(),
                    'totalDiscount' => $totaldiscount
                ];
                return $this->response($finalResult);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting all Discount. Please try again later.'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid query'], 500);
        }
    }

    public function getSingleDiscount(Request $request, $id): JsonResponse
    {
        try {
            $discount = Discount::findOrFail($id);

            if (!$discount) {
                return response()->json(['error' => 'Discount not found.'], 404);
            }

            return $this->response($discount->toArray());
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting single Discount. Please try again later.'], 500);
        }
    }

    public function updateSingleDiscount(Request $request, $id): JsonResponse
    {
        try {
            $discount = Discount::findOrFail($id);

            if (!$discount) {
                return response()->json(['error' => 'Discount not found.'], 404);
            }

            $discount->update([
                'value' => $request->input('value') ?? $discount->value,
                'type' => $request->input('type') ?? $discount->type,
                'startDate' => $request->input('startDate') ?? $discount->startDate,
                'endDate' => $request->input('endDate') ?? $discount->endDate,
                'status' => $request->input('status') ?? $discount->status,
            ]);

            return $this->response($discount->toArray());
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updating single Discount. Please try again later.'], 500);
        }
    }

    public function deleteSingleDiscount(Request $request, $id): JsonResponse
    {
        try {
            $discount = Discount::where('id', $id)->update([
                'status' => $request->input('status'),
            ]);
            if (!$discount) {
                return response()->json(['error' => 'An error occurred during deleting a Discount. Please try again later.'], 500);
            }

            return response()->json(['message' => 'Discount has been deleted successfully.'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during deleting single Discount. Please try again later.'], 500);
        }
    }
}
