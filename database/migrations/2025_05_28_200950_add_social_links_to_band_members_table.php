<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('band_members', function (Blueprint $table) {
            $table->string('spotify_link')->nullable()->after('youtube_link');
            $table->string('apple_music_link')->nullable()->after('spotify_link');
            $table->string('tiktok_link')->nullable()->after('apple_music_link');
        });
    }

    public function down(): void
    {
        Schema::table('band_members', function (Blueprint $table) {
            $table->dropColumn(['spotify_link', 'apple_music_link', 'tiktok_link']);
        });
    }
};
