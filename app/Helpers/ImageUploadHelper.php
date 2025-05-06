<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadHelper
{
    /**
     * Handle image upload, replacement, or removal for a model.
     *
     * @param Request $request The HTTP request containing the file and remove flag
     * @param mixed $model The Eloquent model to update
     * @param string $fileInputName The name of the file input (e.g., 'slider_image')
     * @param string $removeFlagName The name of the remove flag (e.g., 'remove_image')
     * @param string $modelAttribute The model attribute to update (e.g., 'slider_image')
     * @param string $storagePath The storage directory (e.g., 'sliders')
     * @param string $disk The storage disk (default: 'public')
     * @return void
     */
    public static function handleImageUpload(
        Request $request,
                $model,
        string $fileInputName,
        string $removeFlagName,
        string $modelAttribute,
        string $storagePath,
        string $disk = 'public'
    ): void {
        // Handle new file upload
        if ($request->hasFile($fileInputName)) {
            // Delete old image if it exists
            if ($model->$modelAttribute) {
                $oldPath = str_replace('/storage/', '', $model->$modelAttribute);
                Storage::disk($disk)->delete($oldPath);
            }

            // Store new image
            $path = $request->file($fileInputName)->store($storagePath, $disk);
            $model->$modelAttribute = '/storage/' . $path;
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
