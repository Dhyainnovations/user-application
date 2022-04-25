import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchpagePageRoutingModule } from './searchpage-routing.module';
import { SearchpagePage } from './searchpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    SearchpagePageRoutingModule
  ],
  declarations: [SearchpagePage]
})
export class SearchpagePageModule {}
