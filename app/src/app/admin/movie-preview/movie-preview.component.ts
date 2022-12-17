import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from 'src/app/shared/interfaces/movie';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['../../movie/movie-details/movie-details.component.scss']
})
export class MoviePreviewComponent implements OnInit {
  movie: IMovie | null = null;
  errorFetchingData = false;
  trailerId!: string;

  isSaved = false;
  bookmarkClass = 'far fa-bookmark';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const movieId = this.activatedRoute.snapshot.params['id'];

    this.adminService.loadMovieForApproving(movieId).subscribe({
      next: (value) => {
        this.movie = value;
        this.trailerId = this.getTrailerId(value.trailerLink);
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.log(err);
      },
    });
  }

  approveMovie() {
    this.updateMovie();
    this.saveOriginal();
  }

  saveOriginal() {
    const genres = this.movie?.genres.map(x => x._id);
    const title = this.movie?.title;
    const year = this.movie?.year;
    const director = this.movie?.director;
    const writer = this.movie?.writer;
    const imgLink = this.movie?.poster;
    const ytLink = this.movie?.trailerLink;
    const imdbRating = this.movie?.imdbRating;
    const imdbLink = this.movie?.imdbID ? this.getImdbLink(this.movie.imdbID) : this.movie?.imdbLink;
    const description = this.movie?.plot;

    this.adminService.saveMovie(title!, year!, director!, writer!, imgLink!, ytLink!, imdbRating!, imdbLink!, description!, genres!)
    .subscribe({
      next: () => {
        this.router.navigate([`/admin/admin`]);
      },
      error: (err) => {
        console.log(err);
      }
    })

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
