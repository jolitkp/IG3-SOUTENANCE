<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    protected $table = 'projets';
    protected $fillable = [
        'numero',
        'nom',
        'delai',
        'budgetAlloue',
        'budgetDepense',
        'dateDebut',
        'dateFin',
        'objectif',
        'jourCompteRendu',
        'membres',
        'definitionRisques',
        'action',
    ];
    use HasFactory;
}
