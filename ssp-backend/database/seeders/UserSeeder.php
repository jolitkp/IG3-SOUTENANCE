<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'nom'=> 'GOOD',
            'prenom'=> 'Bien',
            'email'=> 'admin@gmail.com',
            'password'=> bcrypt('123456789'),
        ]);

        $role = Role::where('name', 'admin')->first();
        $user->assignRole($role);
    }
}
