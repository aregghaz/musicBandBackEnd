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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            // Presentation Section
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable(); // upload not enabled yet
            $table->date('upcoming_date_from')->nullable();
            $table->date('upcoming_date_to')->nullable();
            $table->string('upcoming_location')->nullable();
            $table->string('upcoming_state')->nullable();
            $table->string('upcoming_country')->nullable();

            // Social Links
            $table->string('instagram_link')->nullable();
            $table->string('facebook_link')->nullable();
            $table->string('twitter_link')->nullable();
            $table->string('youtube_link')->nullable();
            $table->string('apple_link')->nullable();
            $table->string('amazon_link')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
