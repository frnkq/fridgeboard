import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MagnetsModule } from '../magnets/magnets.module';
import { SharedModule } from '../modules/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent,],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MagnetsModule,
    SharedModule,
  ]
})
export class HomeModule { }
