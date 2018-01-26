import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
  declarations: [LandingComponent]
})
export class MainModule { }
