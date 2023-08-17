<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Projet;
use App\Models\Tache;


class ProjetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $projet1= Projet::create([
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

              // Créer des tâches associées au projet
              $tache1 = new Tache([
                'description' => 'Description de la tâche 1',
                'titre' => 'Titre de la tâche 1',
                'statut' => 'En cours',            
            ]);
            $projet1->taches()->save($tache1);
    
            $tache2 = new Tache([
                'description' => 'Description de la tâche 2',
                'titre' => 'Titre de la tâche 2',
                'statut' => 'non_traité',           
             ]);
            $projet1->taches()->save($tache2);

        $projet2= Projet::create([
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
              // Créer des tâches associées au projet
              $tache1 = new Tache([
                'description' => 'Description de la tâche 1',
                'titre' => 'Titre de la tâche 1',
                'statut' => 'En cours',            ]);
            $projet2->taches()->save($tache1);
    
            $tache2 = new Tache([
                'description' => 'Description de la tâche 2',
                'titre' => 'Titre de la tâche 2',
                'statut' => 'traité',            ]);
            $projet2->taches()->save($tache2);
    }
}
