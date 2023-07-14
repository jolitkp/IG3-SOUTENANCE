<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Projet;
use Illuminate\Http\Request;

class ProjetController extends Controller
{
    public function projet()
    {
        $projets = Projet::all();

        return response()->json($projets);
    }

    public function show(Projet $projet)
    {
        return response()->json($projet);
    }

    public function store(Request $request)
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
}
