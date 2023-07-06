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
        $permissions = [
            ['titre'=> 'Tableau de bord', 'name'=> 'dashboard'],
            ['titre'=> 'Gestion des utilisateurs', 'name'=> 'user_manage'],
            ['titre'=> 'Gestion des roles', 'name'=> 'role_manage'],
            ['titre'=> 'Gestion des projets', 'name'=> 'project_manage'],
            ['titre'=> 'Supervision', 'name'=> 'seance_manage'],
            ['titre'=> 'Rapport', 'name'=> 'rapport']

        ];

        foreach($permissions as $permission){
            Permission::create(['titre' => $permission['titre'],
                                'name'=> $permission['name']]);
        }


    //    $role = Role::create(['name' => 'admin']);
    //     $role->givePermissionTo($permission);
        $adminRole = Role::create(['name' => 'admin']);
        $adminPermissions = Permission::pluck('name')->toArray();
        $adminRole->syncPermissions($adminPermissions);


        $chefRole = Role::create(['name' => 'chef']);

        $chefPermissions = ['dashboard', 'project_manage', 'seance_manage', 'rapport'];
        $permissions = Permission::whereIn('name', $chefPermissions)->get();

        $chefRole->syncPermissions($permissions);
    }


    public function getRoles(){
        return Role::pluck('name')->toArray();
    }

    public function getPermissions(){
        return Permission::pluck('name')->toArray();
    }
}
