import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IMovie } from 'src/app/shared/interfaces/movie';
import { environment } from '../../../environments/environment';

const apiURL = environment.apiURL;

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  // movieList: IMovie[] | null = null;
  // errorFetchingData = false;

  // constructor(private apiService: ApiService) { }

  // ngOnInit(): void {
  //   this.apiService.loadMovies().subscribe({
  //     next: (value) => {
  //       this.movieList = value.sort((a, b) => {
  //         if(a.imdbRating < b.imdbRating) {
  //           return 1;
  //         } else if(a.imdbRating > b.imdbRating) {
  //           return -1;
  //         } else {
  //           return 0;
  //         }
  //       })
  //     },
  //     error: (err) => {
  //       this.errorFetchingData = true;
  //       console.log(err);
  //     }
  //   })
  // }

  @ViewChildren('paginationNumber') paginationNumbers!: ElementRef[];

  pager!: {
    pages: number[];
    currentPage: number;
    totalPages: number;
  };
  pageOfItems: IMovie[] | null = null;

  constructor(private http: HttpClient, private apiService: ApiService) {
    // start on page 1
    this.setPage(
      (localStorage.getItem('currentPage') as unknown as number) || 1
    );
  }

  setPage(page: number) {
    localStorage.setItem('currentPage', page as unknown as string);

    const currPage = String(localStorage.getItem('currentPage'));
    // get new pager object and page of items from the api
    this.apiService.loadMovies(currPage)
      .subscribe({
        next: (value: any) => {
          this.pager = value.pager;
          this.pageOfItems = value.pageOfItems;

          let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
              window.scrollTo(0, pos - 40); // how far to scroll on each step
            } else {
              window.clearInterval(scrollToTop);
            }
          }, 16);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
