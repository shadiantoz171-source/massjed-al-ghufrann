<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Year;

class YearController extends Controller
{
    public function active(Request $request)
    {
        $year = Year::where('is_active', true)->first();
        if (!$year) {
            return response()->json(['error' => 'No active year'], 404);
        }
        return response()->json(['id' => $year->id, 'label' => $year->label]);
    }
}
