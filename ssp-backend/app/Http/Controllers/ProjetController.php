<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Projet;
use App\Models\Tache;
use Illuminate\Http\Request;

class ProjetController extends Controller
{
    public function projet()
    {
        $projets = Projet::all();

        return response()->json($projets);
    }

    public function addProjet(Request $request){
        $projet = Projet::create($request->all());
        return response($projet,201);
    }

    public function show(Projet $projet)
    {
        return response()->json($projet);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'delai' => 'required|string',
            'budget' => 'required',
            'datedebut' => 'required',
            'datefin' => 'required',
            'objectif' => 'required',
            'membre' => 'required',
            'risques' => 'required',
        ]);

        $projet = Projet::create($validatedData);

        return response()->json($projet, 201);
    }

    public function update(Request $request, Projet $projet)
    {
        $validatedData = $request->validate([
            'nom' => 'required',
            'delai' => 'required',
            'budgetAlloue' => 'required',
            'budgetDepense' => 'required',
            'dateDebut' => 'required',
            'dateFin' => 'required',
            'objectif' => 'required',
            'jourCompteRendu' => 'required',
            'membres' => 'required',
            'definitionRisques' => 'required',
        ]);

        $projet->update($validatedData);

        return response()->json($projet);
    }

    public function destroy(Projet $projet)
    {
        $projet->delete();

        return response()->json(null, 204);
    }


    public function getProjetbyId($id){

        $projet = Projet::findOrFail($id);

        return response()->json($projet);
    }

    public function getProjetWithTaches($id)
    {
        $taches = Tache::where('projet_id', $id)->get();

        return response()->json($taches);
    }

    public function deleteTache($id)
    {
        $tache = Tache::findOrFail($id);
        $tache->delete();
        return response()->json(['message' => 'Tâche supprimée avec succès']);
    }

    public function create(Request $request, $projetId)
    {
        $projet = Projet::findOrFail($projetId);

        $tache = new Tache();
        $tache->titre = $request->input('titre');
        $tache->description = $request->input('description');
        $tache->statut = $request->input('statut');
        // Ajoutez ici d'autres propriétés de la tâche si nécessaire
        $tache->projet_id = $projet->id; // Associez la tâche au projet

        $tache->save();

        return response()->json($tache, 201);
    }
//     public function create(Request $request, $projetId)
// {
//     // Assurez-vous que l'identifiant est un nombre valide
//     if (!is_numeric($projetId)) {
//         return response()->json(['message' => 'Invalid project identifier'], 400);
//     }

//     // Assurez-vous que le projet existe avant de créer la tâche
//     $projet = Projet::findOrFail($projetId);

//     $tache = new Tache();
//     $tache->titre = $request->input('titre');
//     $tache->description = $request->input('description');
//     $tache->statut = $request->input('statut');

//     // Associez la tâche au projet en utilisant la relation belongsTo
//     $tache->projet()->associate($projet);

//     $tache->save();

//     // Chargez les détails du projet avec les tâches associées
//     $projetAvecTaches = Projet::with('taches')->findOrFail($id);

//     return response()->json($projetAvecTaches, 201);
// }

}
