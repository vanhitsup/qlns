<?php

namespace App\Http\Controllers\Settings\PageSize;

use App\Http\Controllers\Controller;
use App\Models\PageSize;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageSizeController extends Controller
{
    public function createPageSize(Request $request): JsonResponse
    {
        try {
            $pageSize = PageSize::create([
                "pageSizeName" => $request->input("pageSizeName"),
                "width" => $request->input("width"),
                "height" => $request->input("height"),
            ]);

            return $this->response($pageSize->toArray(),201);
        } catch (Exception $e) {
            return response()->json(["error" => "An error occurred while creating the page size record", 500]);
        }
    }

    public function getAllPageSizes(Request $request): JsonResponse
    {
        try {
            if ($request->query()) {
                $pagination = getPagination($request->query());
                $pageSizes = PageSize::orderBy('id', 'desc')->where('status', $request->query('status'))->skip($pagination['skip'])->take($pagination['limit'])->get();
                 ($pageSizes->toArray());
                $aggregate = PageSize::orderBy('id', 'desc')->where('status', $request->query('status'))->get();
                $total = [
                    "getAllPageSize" => $pageSizes->toArray(),
                    "totalPageSizeCount" => count($aggregate)
                ];

                return $this->response($total);
            } else {
                return response()->json(["error" => "Invalid query", 500]);
            }
        } catch (Exception $e) {
            return response()->json(["error" => "An error occurred while retrieving the page sizes", 500]);
        }
    }

    public function getSinglePageSize(Request $request, $id): JsonResponse
    {
        try {
            $pageSize = PageSize::findOrFail($id);
            if ($pageSize) {
                 return $this->response($pageSize->toArray());
            } else {
                return response()->json(["error" => "Page size not found", 404]);
            }
        } catch (Exception $e) {
            return response()->json(["error" => "An error occurred while retrieving the page size", 500]);
        }
    }

    public function updatePageSize(Request $request, $id): JsonResponse
    {
        try {
            $pageSize = PageSize::where('id', $id)->update($request->all());
            if (!$pageSize) {
                return response()->json(["error" => "Page size not found", 404]);
            }
            return response()->json(["message" => "Page Size Updated SuccessFully"]);
        } catch (Exception $e) {
            return response()->json(["error" => "An error occurred while updating the page size", 500]);
        }
    }

    public function deletePageSize(Request $request, $id): JsonResponse
    {
        try {
            $pageSize = PageSize::where('id', $id)->update([
                "status" => $request->input("status"),
            ]);
            if (!$pageSize) {
                return response()->json(["error" => "Page Size Not Deleted", 404]);
            }
            return response()->json(["message" => "Page Size Deleted SuccessFully"], 200);
        } catch (Exception $e) {
            return response()->json(["error" => "An error occurred while deleting the page size", 500]);
        }
    }
}
