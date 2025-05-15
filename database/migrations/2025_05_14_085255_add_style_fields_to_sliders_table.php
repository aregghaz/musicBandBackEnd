<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('sliders', function (Blueprint $table) {
            $table->string('slider_title_color')->after('slider_image_mob');
            $table->unsignedInteger('slider_title_size')->after('slider_title_color');
            $table->string('slider_short_desc_color')->after('slider_title_size');
            $table->unsignedInteger('slider_short_desc_size')->after('slider_short_desc_color');
            $table->unsignedInteger('slider_title_size_mobile')->after('slider_short_desc_size');
            $table->unsignedInteger('slider_short_desc_size_mobile')->after('slider_title_size_mobile');
        });
    }

    public function down()
    {
        Schema::table('sliders', function (Blueprint $table) {
            $table->dropColumn([
                'slider_title_color',
                'slider_title_size',
                'slider_short_desc_color',
                'slider_short_desc_size',
                'slider_title_size_mobile',
                'slider_short_desc_size_mobile',
            ]);
        });
    }
};
