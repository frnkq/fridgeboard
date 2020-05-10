import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagnetsRoutingModule } from './magnets-routing.module';
import { MagnetsComponent } from './magnets.component';
import { MagnetComponent } from './magnet/magnet.component';
import { SharedModule } from '../modules/shared/shared.module';


@NgModule({
  declarations: [MagnetsComponent, MagnetComponent],
  imports: [
    CommonModule,
    MagnetsRoutingModule,
    SharedModule
  ],
  exports: [
    MagnetsComponent,
    MagnetComponent
  ]
})
export class MagnetsModule { }
