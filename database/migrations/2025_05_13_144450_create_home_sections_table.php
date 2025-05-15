<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('home_sections', function (Blueprint $table) {
            $table->id();
            $table->boolean('slider_section')->default(true);
            $table->boolean('about_section')->default(true);
            $table->boolean('album_section')->default(true);
            $table->boolean('latest_album_section')->default(true);
            $table->boolean('contacts_section')->default(true);
            $table->boolean('tours_section')->default(true);
            $table->boolean('concerts_section')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_sections');
    }
};
