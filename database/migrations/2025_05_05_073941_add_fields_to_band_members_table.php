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
        Schema::table('band_members', function (Blueprint $table) {
            $table->string('country')->nullable();
            $table->text('description')->nullable();
            $table->string('facebook_link')->nullable();
            $table->string('instagram_link')->nullable();
            $table->string('wikipedia_link')->nullable();
            $table->string('webpage_link')->nullable();
            $table->string('youtube_link')->nullable();
            $table->boolean('is_active')->default(true);
        });
    }

    public function down(): void
    {
        Schema::table('band_members', function (Blueprint $table) {
            $table->dropColumn([
                'country', 'description', 'facebook_link', 'instagram_link',
                'wikipedia_link', 'webpage_link', 'youtube_link', 'is_active'
            ]);
        });
    }
};
