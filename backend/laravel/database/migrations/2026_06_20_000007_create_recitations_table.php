<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecitationsTable extends Migration
{
    public function up()
    {
        Schema::create('recitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('entered_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('year_id')->nullable()->constrained('years')->nullOnDelete();
            $table->integer('juz_number');
            $table->integer('page_number')->nullable();
            $table->foreignId('surah_id')->nullable()->constrained('surahs')->nullOnDelete();
            $table->date('date_recorded')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('recitations');
    }
}
