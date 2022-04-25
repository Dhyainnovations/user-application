import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectcategoriesPageRoutingModule } from './selectcategories-routing.module';

import { SelectcategoriesPage } from './selectcategories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectcategoriesPageRoutingModule
  ],
  declarations: [SelectcategoriesPage]
})
export class SelectcategoriesPageModule {}
