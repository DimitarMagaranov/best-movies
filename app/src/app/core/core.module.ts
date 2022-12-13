import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { YtPlayerComponent } from './yt-player/yt-player.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
    YtPlayerComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    YouTubePlayerModule
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    PageNotFoundComponent,
    YtPlayerComponent,
    ErrorComponent
  ]
})
export class CoreModule { }
