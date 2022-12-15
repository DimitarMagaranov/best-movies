import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieNewComponent } from './movie-new/movie-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { CoreModule } from '../core/core.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MovieListByGenreComponent } from './movie-list-by-genre/movie-list-by-genre.component';



@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    MovieNewComponent,
    MovieListByGenreComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    YouTubePlayerModule,
    NgMultiSelectDropDownModule
  ], exports: [
    MovieListComponent,
    MovieDetailsComponent,
    MovieNewComponent
  ]
})
export class MovieModule { }
