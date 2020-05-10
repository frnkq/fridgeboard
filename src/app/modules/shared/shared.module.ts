import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button/add-button.component';
import { CreateMagnetFormComponent } from './create-magnet-form/create-magnet-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsComponent } from './icons/icons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [AddButtonComponent, CreateMagnetFormComponent, IconsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    AddButtonComponent,
    CreateMagnetFormComponent,
    IconsComponent
  ]
})
export class SharedModule { }
