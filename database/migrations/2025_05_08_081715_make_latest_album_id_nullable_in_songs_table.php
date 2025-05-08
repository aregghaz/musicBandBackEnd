<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeLatestAlbumIdNullableInSongsTable extends Migration
{
    public function up()
    {
        Schema::table('songs', function (Blueprint $table) {
            $table->unsignedBigInteger('latest_album_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('songs', function (Blueprint $table) {
            $table->unsignedBigInteger('latest_album_id')->nullable(false)->change();
        });
    }
}
