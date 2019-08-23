import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map-google/map.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
// https://www.npmjs.com/package/@angular-material-extensions/google-maps-autocomplete

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'Google map JavaScript API key'
    }),
    MatGoogleMapsAutocompleteModule,

  ]
})

export class MapMdoule {

}
