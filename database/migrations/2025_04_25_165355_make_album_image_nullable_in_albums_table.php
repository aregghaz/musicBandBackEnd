<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeAlbumImageNullableInAlbumsTable extends Migration
{
    public function up()
    {
        Schema::table('albums', function (Blueprint $table) {
            $table->string('album_image')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('albums', function (Blueprint $table) {
            $table->string('album_image')->nullable(false)->change();
        });
    }
}
