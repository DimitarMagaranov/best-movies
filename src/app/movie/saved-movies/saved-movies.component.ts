import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { IMovie } from 'src/app/shared/interfaces/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-saved-movies',
  templateUrl: './saved-movies.component.html',
  styleUrls: [
    '../movie-list/movie-list.component.scss',
    './saved-movies.component.scss',
  ],
})
export class SavedMoviesComponent implements OnInit {
  isThereSavedMovies = false;
  movies: IMovie[] = [];

  constructor(private movieService: MovieService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkIfThereIsSavedMovies();

    if (this.isThereSavedMovies === true) {
      let data = localStorage.getItem('moviesSavedList') as unknown as string;
      let moviesIds = JSON.parse(data) as unknown as string[];

      this.movieService.loadAllMovies().subscribe({
        next: (value) => {
          this.movies = value;
          this.movies = this.movies.filter(
            (movie) => moviesIds.indexOf(movie._id) > -1
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  checkIfThereIsSavedMovies(): void {
    const savedMovies = localStorage.getItem(
      'moviesSavedList'
    ) as unknown as string;

    this.isThereSavedMovies = savedMovies == '[]' ? false : true;
  }

  removeMovie(id: string) {
      let data = localStorage.getItem('moviesSavedList');
      let moviesData = data ? JSON.parse(data) : [];
      const index = moviesData.indexOf(id, 0);
      if (index > -1) {
        moviesData.splice(index, 1);
      }
      localStorage.setItem('moviesSavedList', JSON.stringify(moviesData));
      this.movies = this.movies.filter(x => x._id !== id);
      this.movies = [...this.movies];
      this.checkIfThereIsSavedMovies();
  }

  clearLocalStorageHandler() {
    if (localStorage.getItem('currentPage')) {
      localStorage.removeItem('currentPage');
    }
  }
}
