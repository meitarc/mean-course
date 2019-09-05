import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-intreceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ScrapsModule } from './scraps/scraps.module';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { MapMdoule } from './map/map.mdoule';
import { PiechartDirective } from './d3-graph/piechart.directive';
import { PiechartDirectiveMap } from './‏‏d3-graph-mapreduce/piechart.directive';

import { Postd3Component } from './postd3/postd3.component';

import { WebSocketModule } from './web-socket/web.socket.module';
import { mapReduceD3Component } from './mapReduceD3/mapReduceD3.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    PiechartDirective,
    PiechartDirectiveMap,
    Postd3Component,
    mapReduceD3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
    CommentsModule,
    ScrapsModule,
    MapMdoule,
    MatGoogleMapsAutocompleteModule,

    WebSocketModule,

    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
