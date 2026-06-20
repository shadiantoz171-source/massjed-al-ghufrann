<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id','first_name','father_name','mother_name','father_job',
        'phone_student','phone_father','phone_mother','dob','education_level','created_by'
    ];

    public function recitations()
    {
        return $this->hasMany(Recitation::class);
    }
}
