import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyalarmsPageRoutingModule } from './myalarms-routing.module';

import { MyalarmsPage } from './myalarms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyalarmsPageRoutingModule
  ],
  declarations: [MyalarmsPage]
})
export class MyalarmsPageModule {}
