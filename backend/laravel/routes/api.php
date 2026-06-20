<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/students', [\App\Http\Controllers\Api\StudentController::class, 'index']);
Route::get('/juz-pages', [\App\Http\Controllers\Api\JuzPageController::class, 'index']);
Route::get('/surahs', [\App\Http\Controllers\Api\SurahController::class, 'index']);
Route::get('/years/active', [\App\Http\Controllers\Api\YearController::class, 'active']);
Route::post('/recitations', [\App\Http\Controllers\Api\RecitationController::class, 'store']);
