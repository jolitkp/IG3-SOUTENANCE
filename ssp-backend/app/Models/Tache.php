<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Projet;

class Tache extends Model
{
    use HasFactory;

    protected $table = 'taches';

    protected $fillable = [
        'titre',
        'description',
        'statut',
       
    ];
    // Relation avec le projet
    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }
}
