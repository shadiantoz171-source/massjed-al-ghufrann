<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Surah;

class SurahController extends Controller
{
    public function index(Request $request)
    {
        // If juz=30, return surahs seeded for part 30. Otherwise return all surahs
        $juz = $request->query('juz');
        if ($juz && intval($juz) === 30) {
            $surahs = Surah::where('surah_order', '>=', 78)->orderBy('surah_order')->get(['id','name_ar','surah_order']);
        } else {
            $surahs = Surah::orderBy('surah_order')->get(['id','name_ar','surah_order']);
        }
        return response()->json($surahs);
    }
}
