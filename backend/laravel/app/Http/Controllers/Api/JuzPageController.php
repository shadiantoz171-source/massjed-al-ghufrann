<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JuzPage;

class JuzPageController extends Controller
{
    public function index(Request $request)
    {
        $juz = (int) $request->query('juz', 1);
        $pages = JuzPage::where('juz_number', $juz)->where('is_part30', false)->orderBy('page_number')->get(['page_number']);
        return response()->json($pages);
    }
}
