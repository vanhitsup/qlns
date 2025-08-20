<?php

namespace App\Http\Controllers\Files;

use App\Http\Controllers\Controller;
use App\Models\MediaFiles;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

//
class FilesController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'files' => 'required|file|mimes:jpg,jpeg,png,pdf'
            ]);

            $file = $request->file('files');
            $extension = $file->getClientOriginalExtension();

            $uniqueSuffix = $this->generateFileName();
            $filename = $uniqueSuffix . '.' . $extension;

            $file->storeAs($this->getDestinationPath(), $filename);

            return response()->json(['message' => "File Uploaded SuccessFull"], 201);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during uploaded file. Please try again later.'], 500);
        }
    }

    // Store files upload folder in disk

    protected function generateFileName($bytes = 32): string
    {
        return bin2hex(random_bytes($bytes));
    }

    protected function getDestinationPath(): string
    {
        return 'uploads';
    }

    public function show($id): StreamedResponse|JsonResponse
    {
        try {
            $filePathCustomer = $this->getDestinationPath() . '/' . $id;
            if (Storage::exists($filePathCustomer)) {
                $file = Storage::get($filePathCustomer);
                $mimeType = Storage::mimeType($filePathCustomer);

                return response()->stream(
                    function () use ($file) {
                        echo $file;
                    },
                    200,
                    ['Content-Type' => $mimeType]
                );
            } else {
                $media = MediaFiles::where('id', $id)->first();
                $filePath = $media->filePath;
                if (Storage::exists($filePath)) {
                    $file = Storage::get($filePath);
                    $mimeType = Storage::mimeType($filePath);

                    return response()->stream(
                        function () use ($file) {
                            echo $file;
                        },
                        200,
                        ['Content-Type' => $mimeType]
                    );
                } else {
                    return response()->json(['error' => 'File Not found'], 404);
                }
            }
        } catch
        (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    public function index(): JsonResponse
    {
        try {
            $files = Storage::files($this->getDestinationPath());

            $fileNames = array_map(function ($filePath) {
                return pathinfo($filePath, PATHINFO_BASENAME);
            }, $files);

            return response()->json(['files' => $fileNames]);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during getting file. Please try again later.'], 500);
        }
    }
}
