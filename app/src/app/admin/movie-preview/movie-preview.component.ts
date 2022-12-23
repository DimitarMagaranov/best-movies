import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMovie } from 'src/app/shared/interfaces/movie';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['../../movie/movie-details/movie-details.component.scss', './movie-preview.component.scss']
})
export class MoviePreviewComponent implements OnInit {
  movie: IMovie | null = null;
  trailerId!: string;
  isSaved = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const movieId = this.activatedRoute.snapshot.params['id'];

    this.adminService.loadMovieForApproval(movieId).subscribe({
      next: (value) => {
        this.movie = value;
        this.trailerId = this.getTrailerId(value.trailerLink);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  approveMovie() {
    this.updateMovie();
    this.notifyUser();
    this.saveOriginal();
  }

  updateMovie() {
    this.adminService.approveMovie(this.movie?._id!)
    .subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  notifyUser() {
    const userId = this.movie?.userId;
    const movieId = this.movie?._id;

    this.adminService.notifyUserForApprovedMovie(userId!, movieId!)
      .subscribe({
        next: () => {
          console.log('Notified!');
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  saveOriginal() {
    this.adminService.saveMovie(
      this.movie?.title!,
      this.movie?.year!,
      this.movie?.director!,
      this.movie?.writer!,
      this.movie?.poster!,
      this.movie?.trailerLink!,
      this.movie?.imdbRating!,
      this.movie?.imdbID ? this.getImdbLink(this.movie.imdbID) : this.movie?.imdbLink!,
      this.movie?.plot!,
      this.movie?.genres.map(x => x._id)!)
    .subscribe({
      next: () => {
        this.router.navigate([`/admin`]);
      },
      error: (err) => {
        console.log(err);
      }
    })

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
