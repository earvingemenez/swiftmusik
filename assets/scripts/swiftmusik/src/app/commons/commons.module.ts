import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterceptorsModule } from 'app/commons/services/interceptors/interceptors.module';

@NgModule({
  imports: [
    CommonModule,
    InterceptorsModule
  ],
  declarations: []
})
export class CommonsModule { }
