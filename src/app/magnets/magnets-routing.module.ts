import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MagnetsComponent } from './magnets.component';

const routes: Routes = [{ path: '', component: MagnetsComponent }, {path: ':id', component: MagnetsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagnetsRoutingModule { }
