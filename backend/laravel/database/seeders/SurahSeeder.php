<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SurahSeeder extends Seeder
{
    public function run()
    {
        $surahs = [
            // We'll seed Surahs 78..114 (Juz 30) as requested
            ['name_ar' => 'النبأ', 'surah_order' => 78],
            ['name_ar' => 'النازعات', 'surah_order' => 79],
            ['name_ar' => 'عبس', 'surah_order' => 80],
            ['name_ar' => 'التكوير', 'surah_order' => 81],
            ['name_ar' => 'الإنفطار', 'surah_order' => 82],
            ['name_ar' => 'المطففين', 'surah_order' => 83],
            ['name_ar' => 'الإنشقاق', 'surah_order' => 84],
            ['name_ar' => 'البروج', 'surah_order' => 85],
            ['name_ar' => 'الطارق', 'surah_order' => 86],
            ['name_ar' => 'الأعلى', 'surah_order' => 87],
            ['name_ar' => 'الغاشية', 'surah_order' => 88],
            ['name_ar' => 'الفجر', 'surah_order' => 89],
            ['name_ar' => 'البلد', 'surah_order' => 90],
            ['name_ar' => 'الشمس', 'surah_order' => 91],
            ['name_ar' => 'الليل', 'surah_order' => 92],
            ['name_ar' => 'الضحى', 'surah_order' => 93],
            ['name_ar' => 'الشرح', 'surah_order' => 94],
            ['name_ar' => 'التين', 'surah_order' => 95],
            ['name_ar' => 'العلق', 'surah_order' => 96],
            ['name_ar' => 'القدر', 'surah_order' => 97],
            ['name_ar' => 'البينة', 'surah_order' => 98],
            ['name_ar' => 'الزلزلة', 'surah_order' => 99],
            ['name_ar' => 'العاديات', 'surah_order' => 100],
            ['name_ar' => 'القارعة', 'surah_order' => 101],
            ['name_ar' => 'التكاثر', 'surah_order' => 102],
            ['name_ar' => 'العصر', 'surah_order' => 103],
            ['name_ar' => 'الهمزة', 'surah_order' => 104],
            ['name_ar' => 'الفيل', 'surah_order' => 105],
            ['name_ar' => 'قريش', 'surah_order' => 106],
            ['name_ar' => 'الماعون', 'surah_order' => 107],
            ['name_ar' => 'الكوثر', 'surah_order' => 108],
            ['name_ar' => 'الكافرون', 'surah_order' => 109],
            ['name_ar' => 'النصر', 'surah_order' => 110],
            ['name_ar' => 'المسد', 'surah_order' => 111],
            ['name_ar' => 'الإخلاص', 'surah_order' => 112],
            ['name_ar' => 'الفلق', 'surah_order' => 113],
            ['name_ar' => 'الناس', 'surah_order' => 114],
        ];

        foreach ($surahs as $s) {
            DB::table('surahs')->insert([
                'name_ar' => $s['name_ar'],
                'surah_order' => $s['surah_order'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
