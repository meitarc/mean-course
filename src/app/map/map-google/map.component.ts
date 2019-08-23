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
  public markers: Marker[];
  public locations: any;

  constructor(private userCountry: AuthService, private router: Router) {
  }

  ngOnInit() {

    this.lat = 51.678418;
    this.lng = 7.809007;

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
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }


}
