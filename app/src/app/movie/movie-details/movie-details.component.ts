import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { IMovie } from 'src/app/shared/interfaces/movie';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: IMovie | null = null;
  errorFetchingData = false;
  trailerId!: string;

  bookmarkClass = 'far fa-bookmark';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params);

    const movieId = this.activatedRoute.snapshot.params['id'];

    if (!movieId) {
      this.router.navigate(['/movies/all']);
      return;
    }

    this.apiService.loadMovieById(movieId).subscribe({
      next: (value) => {
        this.movie = value;
        this.trailerId = this.getTrailerId(value.trailerLink);
        console.log(this.trailerId);
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.log(err);
      },
    });

    // this.clearCookie();
  }

  toggleMyClass(): void {}

  getTrailerId(url: string): string {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
      return match[7];
    } else {
      return '';
    }
  }

  getImdbLink(id: string): string {
    return `https://www.imdb.com/title/${id}/?ref_=hm_tpks_tt_i_3_pd_tp1_pbr_ic`;
  }

  // clearCookie() {
  //   const cookies = this.cookieService.getAll();
  //   console.log(cookies);
    
  // }
}
