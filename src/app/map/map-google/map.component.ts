import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Marker } from '../map.model';
import { PostsService } from 'src/app/posts/posts.service';

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
  public markers: Marker[] = [];
  public locations: any;
  constructor(private userCountry: AuthService, private postlocation: PostsService, private router: Router) {
  }

  ngOnInit() {
    // tslint:disable-next-line: variable-name
    const other_array: any[] = [];
    this.lat = 32.2912256;
    this.lng = 34.873344;
    this.postlocation.newGetAll().subscribe((d: any) => {
      d.posts.forEach(element => {
        const mark: Marker = { lat: element.latitude, lng: element.longitude, label: element.title, draggable: false };
        other_array.push(mark);
      });
    });

    this.markers = other_array;
  }
  clickedMarker(label: string, index: number) {
  }

}
