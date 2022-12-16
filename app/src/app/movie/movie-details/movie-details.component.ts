import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { IMovie } from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: IMovie | null = null;
  errorFetchingData = false;
  trailerId!: string;

  isSaved = false;
  bookmarkClass = 'far fa-bookmark';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.activatedRoute.snapshot.params['id'];

    if (!movieId) {
      this.router.navigate(['/movies/all']);
      return;
    }

    this.movieService.loadMovieById(movieId).subscribe({
      next: (value) => {
        this.movie = value;
        this.trailerId = this.getTrailerId(value.trailerLink);
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.log(err);
      },
    });

    this.checkIfTheMovieIsSavedByTheUser();
  }

  checkIfTheMovieIsSavedByTheUser(): void {
    setTimeout(() => {
      const savedMovies = localStorage.getItem(
        'moviesSavedList'
      ) as unknown as string[];
      const movieId = this.movie?._id as unknown as string;
      if (savedMovies.indexOf(movieId) > -1) {
        this.isSaved = true;
      } else {
        this.isSaved = false;
      }
    }, 100);
  }

  saveOrUnsaveMovie(): void {
    if (this.isSaved) {
      this.unsaveMovie();
    } else {
      this.saveMovie();
    }
  }

  saveMovie(): void {
    const movieId = this.movie?._id as unknown as string;
    let data = localStorage.getItem('moviesSavedList');
    let moviesData = data ? JSON.parse(data) : [];
    moviesData.push(movieId);
    localStorage.setItem('moviesSavedList', JSON.stringify(moviesData));

    this.checkIfTheMovieIsSavedByTheUser();
  }

  unsaveMovie(): void {
    const movieId = this.movie?._id as unknown as string;
    let data = localStorage.getItem('moviesSavedList');
    let moviesData = data ? JSON.parse(data) : [];
    moviesData.pop(movieId);
    localStorage.setItem('moviesSavedList', JSON.stringify(moviesData));

    this.checkIfTheMovieIsSavedByTheUser();
  }

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
}
