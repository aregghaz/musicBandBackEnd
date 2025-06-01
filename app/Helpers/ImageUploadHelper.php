<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Log;

class ImageUploadHelper
{
    /**
     * Handle image upload, replacement, or removal for a model with resizing and WebP conversion.
     *
     * @param Request $request The HTTP request containing the file and remove flag
     * @param mixed $model The Eloquent model to update
     * @param string $fileInputName The name of the file input (e.g., 'slider_image')
     * @param string $removeFlagName The name of the remove flag (e.g., 'remove_image')
     * @param string $modelAttribute The model attribute to update (e.g., 'slider_image')
     * @param string $storagePath The storage directory (e.g., 'sliders')
     * @param string $disk The storage disk (default: 'public')
     * @param int $width The desired width for resizing (default: 360)
     * @param int $height The desired height for resizing (default: 400)
     * @return void
     */
    public static function handleImageUpload(
        Request $request,
                $model,
        string $fileInputName,
        string $removeFlagName,
        string $modelAttribute,
        string $storagePath,
        string $disk = 'public',
        int $width = 360,
        int $height = 400
    ): void {
        // Handle new file upload
        if ($request->hasFile($fileInputName)) {
            // Delete old image if it exists
            if ($model->$modelAttribute) {
                $oldPath = str_replace('/storage/', '', $model->$modelAttribute);
                Storage::disk($disk)->delete($oldPath);
            }

            $file = $request->file($fileInputName);

            try {
                // Initialize Intervention Image with GD driver
                $manager = new ImageManager(new Driver());

                // Resize and convert to WebP
                $image = $manager->read($file);
                $image->scale($width, $height); // Resize to fit within specified dimensions while maintaining aspect ratio

                $filename = uniqid('image_') . '.webp';
                $path = $storagePath . '/' . $filename;
                Storage::disk($disk)->put($path, $image->toWebp(90));
                $model->$modelAttribute = '/storage/' . $path;
            } catch (\Exception $e) {
                Log::error('Image processing failed: ' . $e->getMessage());
                $path = $file->store($storagePath, $disk); // Fallback to original file
                $model->$modelAttribute = '/storage/' . $path;
            }
        }
        // Handle image removal
        elseif ($request->boolean($removeFlagName)) {
            if ($model->$modelAttribute) {
                $oldPath = str_replace('/storage/', '', $model->$modelAttribute);
                Storage::disk($disk)->delete($oldPath);
                $model->$modelAttribute = null;
            }
        }
    }
}
