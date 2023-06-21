<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function store(Request $request){
//valider les données du formulaire

    $validator = Validator::make( $request->all(),[
        'roleName' => 'required|string|max:255|unique:roles,name',
        'selectedPermissions' => 'array',
        'selectedPermissions.*' => 'string|exists:permissions,id',
    ],[
        'roleName.unique' => 'Le nom du rôle est déjà pris.',
    ]);


    if($validator->fails()){
        return response()->json(['errors'=>$validator->errors()], 422);
    }


    //recupérer les permissions sélectionnées

    $selectedPermissions = $request->input('selectedPermissions');
    //$permission = Permission::whereIn('name',$validatedData['permissions'])->get();


    // créer le role

    //$role= new Role();
    $role = Role::create(['name'=>$request->input('roleName')]);



    //verifier et assigner les permissions au role
    if ($selectedPermissions !== null){
    foreach( $selectedPermissions as $permissionName){
        $permissions = Permission::findByName($permissionName);
        $role->syncPermissions( $permissions);
        // $role->syncPermissions($selectedPermissions);

    }
    }
    
    // Enregistrer le rôle
    $role->save();
   


    return response()->json(['message' => 'Role créé avec succès']);

}

    public function index(){
        $permissions = Permission::pluck('titre')->toArray();
        return response()->json($permissions);
    }
}