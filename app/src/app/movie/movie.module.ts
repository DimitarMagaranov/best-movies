import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieNewComponent } from './movie-new/movie-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    MovieNewComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    YouTubePlayerModule,
  ], exports: [
    MovieListComponent,
    MovieDetailsComponent,
    MovieNewComponent
  ]
})
export class MovieModule { }
