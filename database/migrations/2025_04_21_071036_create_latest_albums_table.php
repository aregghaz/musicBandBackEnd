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
        Schema::create('latest_albums', function (Blueprint $table) {
            $table->id();
            $table->string('album_title');
            $table->string('album_label')->nullable();
            $table->date('album_released')->nullable();
            $table->string('album_genre')->nullable();
            $table->string('album_styles')->nullable();
            $table->string('album_image')->nullable();
            $table->string('album_amazon_link')->nullable();
            $table->string('album_apple_link')->nullable();
            $table->string('album_youtube_link')->nullable();
            $table->string('album_spotify_link')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('latest_albums');
    }
};
