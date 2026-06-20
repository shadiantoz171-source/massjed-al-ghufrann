<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recitation extends Model
{
    use HasFactory;

    protected $fillable = ['student_id','entered_by','year_id','juz_number','page_number','surah_id','date_recorded','notes'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
