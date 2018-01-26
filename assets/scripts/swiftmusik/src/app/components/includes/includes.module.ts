import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainHeaderComponent, MainFooterComponent]
})
export class IncludesModule { }
