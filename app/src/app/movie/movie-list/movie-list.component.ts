import {
  Component,
  ElementRef,
  ViewChildren,
} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IMovie } from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  movies: IMovie[] | null = null;
  errorFetcingData = false;

  @ViewChildren('paginationNumber') paginationNumbers!: ElementRef[];

  pager!: {
    pages: number[];
    currentPage: number;
    totalPages: number;
  };
  pageOfItems: IMovie[] | null = null;

  constructor(private apiService: ApiService) {
    // start on page 1
    this.setPage(
      (localStorage.getItem('currentPage') as unknown as number) || 1
    );
  }

   // constructor(private apiService: ApiService) {
  //     // start on page 1
  //     // this.setPage(
  //     //   (localStorage.getItem('currentPage') as unknown as number) || 1
  //     // );

  //     this.apiService.loadAllMovies().subscribe({
  //       next: (value) => {
  //         this.movies = value;
  //       },
  //       error: (err) => {
  //         this.errorFetcingData = true;
  //         console.log(err);
          
  //       }
  //     })
  //   }

  setPage(page: number) {
    localStorage.setItem('currentPage', page as unknown as string);

    const currPage = String(localStorage.getItem('currentPage'));
    // get new pager object and page of items from the api
    this.apiService.loadMovies(currPage).subscribe({
      next: (value: any) => {
        this.pager = value.pager;
        this.pageOfItems = value.pageOfItems;

        this.scrollToTopFn();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  scrollToTopFn(): void {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 40); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
