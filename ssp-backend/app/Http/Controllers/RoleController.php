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
    ]);


    if($validator->fails()){
        return response()->json(['errors'=>$validator->errors()], 422);
    }

    $selectedPermissions = $request->input('selectedPermissions');
    //$permission = Permission::whereIn('name',$validatedData['permissions'])->get();


    // créer le role
    //$role= new Role();
    $role = Role::create(['name'=>$request->input('roleName')]);

    //recupérer les permissions sélectionnées


    //verifier et assigner les permissions au role

    /*foreach($permissions as $permissionName){
        $permission = Permission::findByName($permissionName);
        $role->givePermissionTo($permission);
    }*/

    $role->syncPermissions($selectedPermissions);
    $role->save();


    return response()->json(['message' => 'Role créé avec succès']);

}

    public function index(){
        $permissions = Permission::pluck('titre')->toArray();
        return response()->json($permissions);
    }

    public function getRoles()
    {
        $roles = Role::all();

        return response()->json($roles);
    }

    public function getRoleDetails($roleId){
        $role = Role::findOrfail($roleId);
        $permissions = $role->permissions;
        
        return response()->json([
            'roleName' => $role->name,
            'permissions' => $permissions->pluck('name')->toArray(),
        ]);
        // $role = Role::with('permissions')->find($roleId);

        // if(!$role){
        //     return response()->json(['message'=> 'Role non trouvé'], 404);
        // }
        // return response()->json($role);
    }

    public function destroy(Role $role){
        $role->delete();
        return response()->json(['message'=> 'Role supprimé avec succès']);
    }

    public function deleteRole(Request $request,$id){
        $role = Role::find($id);
        if(is_null($role)){
            return response()->json(['message'=>'Role introuvable'],404);
        }
        $role->delete();
        return response(null,204);
    }

    public function getRolebyId($id) {
        $role = Role::find($id);
        if(is_null($role)){
            return response()->json(['message'=> 'Utilisateur introuvable'],404);
        }
        return response()->json(Role::find($id),200);
    }

    public function updateRole(Request $request, $id) {
        $role = Role::find($id);
        if(is_null($role)){
            return response()->json(['message'=>'Utilisateur introuvable'],404);
        }
        $role->update($request->all());
        return response($role,200);
    }
}