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
import { GenreFilterComponent } from './genre-filter/genre-filter.component';
import { SavedMoviesComponent } from './saved-movies/saved-movies.component';



@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    MovieNewComponent,
    GenreFilterComponent,
    SavedMoviesComponent,
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
