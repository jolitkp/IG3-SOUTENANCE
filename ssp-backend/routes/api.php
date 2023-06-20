<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Database\Seeders\PermissionSeeder;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get("show",[HomeController::class,"index"]);

Route::post("login-page",[AuthController::class,"login"]);

Route::post("logout-page",[AuthController::class,"logout"]);

Route::post("signup-page",[AuthController::class,"signup"]);

Route::get("permission",[RoleController::class,"index"]);

Route::post("users",[AuthController::class,"store"]);
Route::post("roles",[RoleController::class,"store"]);
