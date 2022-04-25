import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyalarmsPage } from './myalarms.page';

const routes: Routes = [
  {
    path: '',
    component: MyalarmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyalarmsPageRoutingModule {}
