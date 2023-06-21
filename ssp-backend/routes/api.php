<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\HomeController;
//use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\Http\Controllers\AuthorizationController;
use Laravel\Passport\Http\Controllers\ApproveAuthorizationController;
use Laravel\Passport\Http\Controllers\DenyAuthorizationController;
use Laravel\Passport\Http\Controllers\PersonalAccessTokenController;



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


//Route::get("show",[HomeController::class,"index"]);

//Route::post("login-page",[AuthController::class,"login"]);

//Route::post("logout-page",[AuthController::class,"logout"]);

//Route::post("signup-page",[AuthController::class,"signup"]);

Route::get("permission",[RoleController::class,"index"]);

//Route::post("users",[AuthController::class,"store"]);
Route::post("roles",[RoleController::class,"store"]);

Route::group(['middleware' => 'auth:api'], function (){
// Routes pour l'autorisation et la révocation d'accès des clients
Route::post('oauth/token', [AccessTokenController::class, 'issueToken']);
Route::post('/oauth/authorize', [AuthorizationController::class, 'authorize']);
Route::post('/oauth/authorize/{authTokenId}', [ApproveAuthorizationController::class, 'approve']);
Route::delete('/oauth/authorize/{authTokenId}', [DenyAuthorizationController::class, 'deny']);

});


// Routes pour la gestion des jetons d'accès personnels
Route::post('/oauth/personal-access-tokens', [PersonalAccessTokenController::class, 'store']);
Route::get('/oauth/personal-access-tokens', [PersonalAccessTokenController::class, 'forUser']);
Route::delete('/oauth/personal-access-tokens/{tokenId}', [PersonalAccessTokenController::class, 'destroy']);
