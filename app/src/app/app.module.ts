import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MovieModule } from './movie/movie.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { appInterceptorProvider } from './app.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { API_ERROR } from './shared/constants';
import { BehaviorSubject } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    MovieModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    appInterceptorProvider,
    {
      provide: API_ERROR,
      useValue: new BehaviorSubject(null)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
