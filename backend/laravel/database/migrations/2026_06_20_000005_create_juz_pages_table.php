<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJuzPagesTable extends Migration
{
    public function up()
    {
        Schema::create('juz_pages', function (Blueprint $table) {
            $table->id();
            $table->integer('juz_number');
            $table->integer('page_number');
            $table->boolean('is_part30')->default(false);
            $table->foreignId('surah_id')->nullable()->constrained('surahs')->nullOnDelete();
            $table->timestamps();
            $table->unique(['juz_number','page_number']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('juz_pages');
    }
}
