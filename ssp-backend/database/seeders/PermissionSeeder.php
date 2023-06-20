<?php

namespace Database\Seeders;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permission = [
            ['titre'=> 'Tableau de bord', 'name'=> 'dashboard'],
            ['titre'=> 'Gestion des utilisateurs', 'name'=> 'user_manage'],
            ['titre'=> 'Gestion des roles', 'name'=> 'role_manage'],
            ['titre'=> 'Gestion des projets', 'name'=> 'project_manage'],
            ['titre'=> 'Supervision', 'name'=> 'seance_manage'],
            ['titre'=> 'Rapport', 'name'=> 'rapport']

        ];

        foreach($permission as $permissionName){
            Permission::create(['titre' => $permissionName['titre'],
                                'name'=> $permissionName['name']]);
        }


     //   $role = Role::create(['name' => 'admin']);
      //  $role->givePermissionTo($permission);
    }


    public function getRoles(){
        return Role::pluck('name')->toArray();
    }

    public function getPermissions(){
        return Permission::pluck('name')->toArray();
    }
}
