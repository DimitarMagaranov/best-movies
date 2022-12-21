import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { appInterceptorProvider } from './interceptors/app.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { API_ERROR } from './shared/constants';
import { BehaviorSubject } from 'rxjs';
import { urlInterceptorProvider } from './interceptors/url.interceptor';
import { httpInterceptorProvider } from './interceptors/http.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListFilterPipeForMovies } from './shared/pipes/listFilterPipeForMovies';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent
    
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    urlInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
