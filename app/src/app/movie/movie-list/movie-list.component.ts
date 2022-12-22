import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { IMovie } from 'src/app/shared/interfaces/movie';
import { IGenre } from 'src/app/shared/interfaces/genre';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivatedRoute } from '@angular/router';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  movies: IMovie[] = [];
  allMovies!: IMovie[];
  page = 1;
  pageSize = 20;
  collectionSize!: number;
  isListView: boolean;

  genreId!: string;
  genres: IGenre[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
    this.route.url.subscribe((params) => {
      this.genreId = params[1]?.path;
    });
    this.isListView = this.sessionStorageListViewValueIsList();

    this.populateGenresAndGenreDropdownButtonSettings();

    if (this.genreId !== undefined) {
      this.loadMoviesByGenreFilter(this.genreId);
    } else {
      this.loadMoviesWithoutGenreFilter();
    }
  }

  loadMoviesWithoutGenreFilter() {
    this.movieService.loadAllMovies().subscribe({
      next: (value) => {
        this.movies = value;
        this.movies = this.movies.sort((a, b) => b.imdbRating - a.imdbRating);
        this.allMovies = this.movies;
        this.collectionSize = this.movies.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

	getPageSymbol(current: number) {
		return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
	}

	selectPage(page: string) {
		this.page = parseInt(page, 10) || 1;
	}

	formatInput(input: HTMLInputElement) {
		input.value = input.value.replace(FILTER_PAG_REGEX, '');
	}

  loadMoviesByGenreFilter(genreId: string) {
    this.movieService.loadAllMovies().subscribe({
      next: (value) => {
        let moviesByGenre = [];
        this.movies = value;
        this.movies = this.movies.sort((a, b) => b.imdbRating - a.imdbRating);
        for (let i = 0; i < this.movies.length; i++) {
          const movie = this.movies[i];
          for (let j = 0; j < movie.genres.length; j++) {
            const genre = movie.genres[j];
            if ((genre as unknown as string) == genreId) {
              moviesByGenre.push(movie);
            }
          }
        }
        this.movies = moviesByGenre;
        this.collectionSize = this.movies.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearGenreFilter() {
    this.movies = this.allMovies;
    this.collectionSize = this.movies.length;
  }

  populateGenresAndGenreDropdownButtonSettings() {
    this.movieService.loadAllGenres().subscribe({
      next: (value) => {
        this.genres = value;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.dropdownSettings = {
      idField: '_id',
      textField: 'title',
      singleSelection: true,
      allowSearchFilter: true,
      disabledField: 'asdasd',
    };
  }

  selectGenreHandler(value: any) {
    const genre = value as IGenre;
    this.loadMoviesByGenreFilter(genre._id);
  }

  toggleListView() {
    this.isListView = !this.isListView;

    if (this.isListView) {
      sessionStorage.setItem('list-view', 'list');
    } else {
      sessionStorage.setItem('list-view', 'cards');
    }
  }

  sessionStorageListViewValueIsList(): boolean {
    return sessionStorage.getItem('list-view') == 'list';
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
