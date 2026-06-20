<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurahsTable extends Migration
{
    public function up()
    {
        Schema::create('surahs', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar');
            $table->string('name_en')->nullable();
            $table->integer('start_page')->nullable();
            $table->integer('end_page')->nullable();
            $table->integer('surah_order')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('surahs');
    }
}
