<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMissingColumnsToAlbumsTable extends Migration
{
    public function up()
    {
        Schema::table('albums', function (Blueprint $table) {
            $table->string('album_label')->nullable()->after('album_name');
            $table->string('album_genre')->nullable()->after('released_date');
            $table->string('album_styles')->nullable()->after('album_genre');
        });
    }

    public function down()
    {
        Schema::table('albums', function (Blueprint $table) {
            $table->dropColumn(['album_label', 'album_genre', 'album_styles']);
        });
    }
}
