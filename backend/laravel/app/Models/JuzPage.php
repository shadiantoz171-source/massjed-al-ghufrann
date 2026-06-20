<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JuzPage extends Model
{
    use HasFactory;

    protected $fillable = ['juz_number','page_number','is_part30','surah_id'];

    public function surah()
    {
        return $this->belongsTo(Surah::class);
    }
}
