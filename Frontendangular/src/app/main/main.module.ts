import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetCreationComponent } from '../projet-creation/projet-creation.component';



@NgModule({
  declarations: [
    ProjetCreationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ProjetCreationComponent]
})
export class MainModule { }
