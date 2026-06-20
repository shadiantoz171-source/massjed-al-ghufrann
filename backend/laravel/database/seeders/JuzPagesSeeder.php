<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JuzPagesSeeder extends Seeder
{
    public function run()
    {
        // Mathematical division as requested: pages 1..581 distributed into 29 juz
        $N = 581;
        $M = 29;
        $base = intdiv($N, $M); // 20
        $r = $N % $M; // 1

        $page = 1;
        for ($j = 1; $j <= $M; $j++) {
            $size = ($j <= $r) ? ($base + 1) : $base;
            for ($i = 0; $i < $size; $i++) {
                DB::table('juz_pages')->insert([
                    'juz_number' => $j,
                    'page_number' => $page,
                    'is_part30' => false,
                    'surah_id' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $page++;
            }
        }
    }
}
