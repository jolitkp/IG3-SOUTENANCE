<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projets', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('delai');
            $table->date('datedebut');
            $table->date('datefin');
            $table->integer('budget');
            $table->text('objectif');
            $table->string('membre');
            $table->text('risques');
            $table->timestamps();



            // $table->foreignId('tache_id')->constrained();
            // $table->foreignId('compte_rendu_id')->constrained();
            // $table->foreignId('fichier_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projets');
    }
};
