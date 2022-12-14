import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { YtPlayerComponent } from './yt-player/yt-player.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AboutUsComponent } from './about-us/about-us.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
    YtPlayerComponent,
    ContactUsComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    YouTubePlayerModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    PageNotFoundComponent,
    YtPlayerComponent
  ]
})
export class CoreModule { }
