import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectcategoriesPage } from './selectcategories.page';

const routes: Routes = [
  {
    path: '',
    component: SelectcategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectcategoriesPageRoutingModule {}
