<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveFormattedDescriptionFromBandMembersTable extends Migration
{
    public function up()
    {
        Schema::table('band_members', function (Blueprint $table) {
            $table->dropColumn('formatted_description');
        });
    }

    public function down()
    {
        Schema::table('band_members', function (Blueprint $table) {
            $table->text('formatted_description')->nullable()->after('description');
        });
    }
}
