<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class YearSeeder extends Seeder
{
    public function run()
    {
        DB::table('years')->insert([
            'label' => date('Y'),
            'start_date' => date('Y-01-01'),
            'end_date' => date('Y-12-31'),
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
