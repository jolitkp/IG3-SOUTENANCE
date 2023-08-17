<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Database\Seeders\PermissionSeeder;
use App\Http\Controllers\ProjetController;


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

//Route::post("users",[AuthController::class,"store"]);
Route::get("users",[AuthController::class,"getUser"]);
Route::get("users/{id}/role",[AuthController::class,"getUserRole"]);
Route::get("user/{id}",[AuthController::class,"getUserbyId"]);
Route::post("addUser",[AuthController::class,"addUser"]);
Route::put("updateUser/{id}",[AuthController::class,"updateUser"]);
Route::delete("deleteUser/{id}",[AuthController::class,"deleteUser"]);
Route::patch("users/{id}/block",[AuthController::class,"blockUser"]);
Route::patch("users/{id}/unblock",[AuthController::class,"unblockUser"]);



Route::post("roles",[RoleController::class,"store"]);
Route::get("role",[RoleController::class,"getRoles"]);
Route::get("role/{roleId}",[RoleController::class,"getRoleDetails"]);
Route::delete("deleteRole/{id}",[RoleController::class,"deleteRole"]);
Route::get("role/{id}",[RoleController::class,"getRolebyId"]);
Route::put("updateRole/{id}",[RoleController::class,"updateRole"]);
Route::get("role/{roleId}/name",[RoleController::class,"getRoleNameById"]);
Route::post("assignerole",[RoleController::class,"assignRole"]);


Route::get('projets', [ProjetController::class, 'projet']);
Route::get('/projets/{projet}', [ProjetController::class, 'show']);
Route::get('projet/{id}', [ProjetController::class, 'getProjetbyId']);
Route::get('projet/{id}/taches', [ProjetController::class, 'getProjetWithTaches']);
Route::post('addProjet', [ProjetController::class, "store"]);
Route::put('/projets/{projet}', [ProjetController::class, 'update']);
Route::delete('deleteTache/{id}', [ProjetController::class, 'deleteTache']);
Route::post("projets/{projetId}/taches",[ProjetController::class,"create"]);
