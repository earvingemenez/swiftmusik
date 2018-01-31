import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { NgxY2PlayerModule } from 'ngx-y2-player';


@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule,
    NgxY2PlayerModule
  ],
  declarations: [LandingComponent]
})
export class MainModule { }
