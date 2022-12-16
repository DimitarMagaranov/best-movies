import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { MovieService } from '../movie.service';
import { IMovie } from 'src/app/shared/interfaces/movie';
import { IGenre } from 'src/app/shared/interfaces/genre';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  movies: IMovie[] = [];
  filteredMovies: IMovie[] = [];
  errorFetchingData = false;
  isListView = false;

  genres: IGenre[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private movieService: MovieService) {

    this.populateGenresAndGenreDropdownButtonSettings();

    this.movieService.loadAllMovies().subscribe({
      next: (value) => {
        this.movies = value;
        this.movies = this.movies.sort((a, b) => b.imdbRating - a.imdbRating);
        this.filteredMovies = this.movies;
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.log(err);
      },
    });
  }

  filterByGenre(genreId: string) {
    let moviesByGenre = [];
    if (this.movies) {
      for (let i = 0; i < this.movies.length; i++) {
        const movie = this.movies[i];
        for (let j = 0; j < movie.genres.length; j++) {
          const genre = movie.genres[j];
          console.log(genre);
          
          if (genre as unknown as string == genreId) {
            moviesByGenre.push(movie);
          }
        }
      }
      this.filteredMovies = moviesByGenre;
    }
  }

  clearGenreFilter() {
    this.filteredMovies = this.movies;
  }

  populateGenresAndGenreDropdownButtonSettings() {
    this.movieService.loadAllGenres().subscribe({
      next: (value) => {
        this.genres = value;
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.log(err);
      },
    });

    this.dropdownSettings = {
      idField: '_id',
      textField: 'title',
      singleSelection: true,
    };
  }

  selectGenreHandler(value: any) {
    const genre = value as IGenre;
    this.filterByGenre(genre._id);
  }

  toggleListView() {
    this.isListView = !this.isListView;
  }

  // @ViewChildren('paginationNumber') paginationNumbers!: ElementRef[];

  // pager!: {
  //   pages: number[];
  //   currentPage: number;
  //   totalPages: number;
  // };
  // pageOfItems: IMovie[] | null = null;

  // constructor(private movieService: MovieService) {
  //   // start on page 1
  //   this.setPage(
  //     (localStorage.getItem('currentPage') as unknown as number) || 1
  //   );
  // }

  // setPage(page: number) {
  //   localStorage.setItem('currentPage', page as unknown as string);

  //   const currPage = String(localStorage.getItem('currentPage'));
  //   // get new pager object and page of items from the api
  //   this.movieService.loadMovies(currPage).subscribe({
  //     next: (value: any) => {
  //       this.pager = value.pager;
  //       this.pageOfItems = value.pageOfItems;

  //       this.scrollToTopFn();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // scrollToTopFn(): void {
  //   let scrollToTop = window.setInterval(() => {
  //     let pos = window.pageYOffset;
  //     if (pos > 0) {
  //       window.scrollTo(0, pos - 40); // how far to scroll on each step
  //     } else {
  //       window.clearInterval(scrollToTop);
  //     }
  //   }, 16);
  // }
}
