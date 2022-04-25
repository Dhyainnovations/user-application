import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsernameLoginPageRoutingModule } from './username-login-routing.module';

import { UsernameLoginPage } from './username-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsernameLoginPageRoutingModule
  ],
  declarations: [UsernameLoginPage]
})
export class UsernameLoginPageModule {}
