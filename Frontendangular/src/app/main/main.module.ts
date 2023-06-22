import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetCreationComponent } from '../projet-creation/projet-creation.component';
import { MainComponent } from './main.component';



@NgModule({
  declarations: [
    ProjetCreationComponent,
    MainComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ProjetCreationComponent]
})
export class MainModule { }
