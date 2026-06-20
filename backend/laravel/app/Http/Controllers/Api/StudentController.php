<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $students = Student::select('id','first_name','father_name','mother_name','education_level')->orderBy('first_name')->get();
        // Return a friendly name
        $students->transform(function($s){
            $s->display_name = $s->first_name . ($s->father_name ? ' \u2014 ' . $s->father_name : '');
            return $s;
        });
        return response()->json($students);
    }
}
