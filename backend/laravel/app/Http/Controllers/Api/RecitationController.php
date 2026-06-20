<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Recitation;
use App\Models\Year;

class RecitationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'student_id' => 'required|integer|exists:students,id',
            'juz_number' => 'required|integer|min:1|max:30',
            'items' => 'required|array|min:1',
            'date_recorded' => 'nullable|date',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Determine active year
        $year = Year::where('is_active', true)->first();
        $year_id = $year ? $year->id : null;

        $created = [];
        foreach ($data['items'] as $item) {
            // Each item must have either page_number or surah_id
            if (isset($item['page_number'])) {
                $rec = Recitation::create([
                    'student_id' => $data['student_id'],
                    'entered_by' => $request->user() ? $request->user()->id : null,
                    'year_id' => $year_id,
                    'juz_number' => $data['juz_number'],
                    'page_number' => $item['page_number'],
                    'surah_id' => null,
                    'date_recorded' => $data['date_recorded'] ?? null,
                    'notes' => $data['notes'] ?? null,
                ]);
                $created[] = $rec->id;
            } elseif (isset($item['surah_id'])) {
                $rec = Recitation::create([
                    'student_id' => $data['student_id'],
                    'entered_by' => $request->user() ? $request->user()->id : null,
                    'year_id' => $year_id,
                    'juz_number' => $data['juz_number'],
                    'page_number' => null,
                    'surah_id' => $item['surah_id'],
                    'date_recorded' => $data['date_recorded'] ?? null,
                    'notes' => $data['notes'] ?? null,
                ]);
                $created[] = $rec->id;
            }
        }

        return response()->json(['created' => $created], 201);
    }
}
