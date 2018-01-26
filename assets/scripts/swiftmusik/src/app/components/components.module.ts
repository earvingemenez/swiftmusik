import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModule } from 'app/components/main/main.module';
import { IncludesModule } from 'app/components/includes/includes.module';

@NgModule({
  imports: [
    CommonModule,
    MainModule,
    IncludesModule
  ],
  declarations: []
})
export class ComponentsModule { }
