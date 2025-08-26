<?php

namespace App\Services;

use App\Models\MediaFiles;
use App\Traits\ErrorTrait;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileUploadService
{
    use ErrorTrait;

    /**
     * Upload file và lưu vào storage
     */
    public function uploadFile(UploadedFile $file, string $directory = 'staff-files', string $username = null): JsonResponse
    {
        try {
            if (!$file->isValid()) {
                return $this->badRequest('Invalid file.');
            }

            // Validate file type
            $allowedMimes = [
                'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 
                'application/pdf', 'application/msword', 
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];

            if (!in_array($file->getMimeType(), $allowedMimes)) {
                return $this->badRequest('File type not allowed. Allowed types: jpg, jpeg, png, gif, pdf, doc, docx, xls, xlsx');
            }

            // Validate file size (max 5MB)
            if ($file->getSize() > 5 * 1024 * 1024) {
                return $this->badRequest('File size too large. Maximum size is 5MB.');
            }

            $fileName = $file->getClientOriginalName();
            $fileExtension = $file->getClientOriginalExtension();
            $timestamp = time();
            
            // Tạo tên file theo format: {mục}_{filename}_{time}
            $nameWithoutExtension = pathinfo($fileName, PATHINFO_FILENAME);
            $sanitizedName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $nameWithoutExtension);
            $uniqueFileName = $directory . '_' . $sanitizedName . '_' . $timestamp . '.' . $fileExtension;
            
            // Tạo đường dẫn thư mục: {username}/{mục}_{filename}_{time}
            $fullDirectory = $username ? $username : 'general';
            
            // Store file
            $filePath = $file->storeAs($fullDirectory, $uniqueFileName);

            if (!$filePath) {
                return $this->badRequest('Failed to store file.');
            }

            // Save file info to database
            $mediaFile = MediaFiles::create([
                'fileName' => $fileName,
                'filePath' => $filePath,
                'fileType' => $file->getMimeType(),
                'fileSize' => $file->getSize(),
            ]);

            return $this->response([
                'id' => $mediaFile->id,
                'fileName' => $fileName,
                'filePath' => $filePath,
                'fileType' => $file->getMimeType(),
                'fileSize' => $file->getSize(),
                'url' => Storage::url($filePath)
            ]);

        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Upload multiple files
     */
    public function uploadMultipleFiles(array $files, string $directory = 'staff-files', string $username = null): JsonResponse
    {
        try {
            $uploadedFiles = [];

            foreach ($files as $file) {
                if ($file instanceof UploadedFile) {
                    $result = $this->uploadFile($file, $directory, $username);
                    
                    if ($result->getStatusCode() !== 200) {
                        return $result;
                    }
                    
                    $uploadedFiles[] = json_decode($result->getContent(), true);
                }
            }

            return $this->response($uploadedFiles);

        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Delete file from storage
     */
    public function deleteFile(string $filePath): JsonResponse
    {
        try {
            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
                
                // Delete from database
                MediaFiles::where('filePath', $filePath)->delete();
                
                return $this->success('File deleted successfully');
            }

            return $this->notFound('File not found');

        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Get file URL
     */
    public function getFileUrl(string $filePath): string
    {
        return Storage::url($filePath);
    }



    /**
     * Process file upload from form data
     */
    public function processFileUpload($fileData, string $directory = 'staff-files', string $username = null): ?string
    {
        try {
            if (!$fileData || !($fileData instanceof UploadedFile)) {
                return null;
            }

            $result = $this->uploadFile($fileData, $directory, $username);
            
            if ($result->getStatusCode() === 200) {
                $data = json_decode($result->getContent(), true);
                return $data['filePath'];
            }

            return null;

        } catch (Exception $error) {
            return null;
        }
    }
}
