import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScrapListComponent } from './scrap-list/scrap-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ScrapFilterPipe } from './scraps-filter.pipe';

@NgModule({
  declarations: [
    ScrapListComponent,
    ScrapFilterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ]
})

export class ScrapsModule { }
