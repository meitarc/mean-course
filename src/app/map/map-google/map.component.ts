import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Marker } from '../map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public appearance = Appearance;
  public zoom: number;
  public lat: number;
  public lng: number;
  public selectedAddress: PlaceResult;
  public country: [2];
  public markers: Marker[] = [];
  public locations: any;

  constructor(private userCountry: AuthService, private router: Router) {
  }

  ngOnInit() {
    // tslint:disable-next-line: variable-name
    const other_array: any[] = [];
    this.lat = 51.678418;
    this.lng = 7.809007;

    console.log('start grab from data base');

    this.userCountry.getcountries().subscribe(d => {
      // tslint:disable-next-line: only-arrow-functions
      d.countries.forEach(function(object) {
        // tslint:disable-next-line: prefer-const
        let mark: Marker = { lat: object.lat, lng: object.lng, label: object.label, draggable: object.draggable };
        other_array.push(mark);
      });
    });
    this.markers = other_array;
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

}

/*
    this.markers = [
      {
        lat: 51.673858,
        lng: 7.815982,
        label: 'A',
        draggable: true
      },
      {
        lat: 51.373858,
        lng: 7.215982,
        label: 'B',
        draggable: false
      },
      {
        lat: 51.723858,
        lng: 7.895982,
        label: 'C',
        draggable: true
      }
    ];
    */
