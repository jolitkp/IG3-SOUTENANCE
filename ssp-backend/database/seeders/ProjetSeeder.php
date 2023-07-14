<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Projet;

class ProjetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Projet::create([
            'nom' => 'Projet 1',
            'delai' => 'Delai du projet 1',
            'datedebut' => '2023-01-01',
            'datefin' => '2023-12-31',
            'budget' => 100000,
            'objectif' => 'Objectif du projet 1',
            'membre' => 'TOKO Jean , 
                         TOTO Ben, 
                         KAKA Katia',
            'risques' => 'Risques du projet 1',
        ]);

        Projet::create([
            'nom' => 'Projet 2',
            'delai' => 'Delai du projet 2',
            'datedebut' => '2023-02-01',
            'datefin' => '2023-11-30',
            'budget' => 150000,
            'objectif' => 'Objectif du projet 2',
            'membre' => 'SOSO Take, 
                         LOLO Lan, 
                         NOIS Noir',
            'risques' => 'Risques du projet 2',
        ]);
    }
}
