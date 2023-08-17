<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tache;

class Projet extends Model
{
    use HasFactory;

    protected $table = 'projets';

    protected $fillable = [
        'nom',
        'delai',
        'datedebut',
        'datefin',
        'budget',
        'objectif',
        'membre',
        'risques',
    ];
    protected $casts = [
        'datedebut' => 'datetime:Y-m-d H:i:s',
        'datefin' => 'datetime:Y-m-d H:i:s',
    ];

     // Relation avec les tâches
     public function taches()
     {
         return $this->hasMany(Tache::class);
     }
}
