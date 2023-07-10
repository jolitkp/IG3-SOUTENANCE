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
            $table->integer('numero');
            $table->string('nom');
            $table->string('delai');
            $table->decimal('budgetAlloue', 8, 2);
            $table->decimal('budgetDepense', 8, 2);
            $table->date('dateDebut');
            $table->date('dateFin');
            $table->string('objectif');
            $table->string('jourCompteRendu');
            $table->string('membres');
            $table->string('definitionRisques');
            $table->string('action');
            $table->timestamps();
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
