<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Surah extends Model
{
    use HasFactory;

    protected $fillable = ['name_ar','name_en','start_page','end_page','surah_order'];

    public function juzPages()
    {
        return $this->hasMany(JuzPage::class);
    }
}
