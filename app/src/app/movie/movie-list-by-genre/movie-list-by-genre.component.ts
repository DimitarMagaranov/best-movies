import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { IMovie } from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-movie-list-by-genre',
  templateUrl: './movie-list-by-genre.component.html',
  styleUrls: ['../movie-list/movie-list.component.scss']
})
export class MovieListByGenreComponent implements OnInit {

  movies!: IMovie[];
  moviesByGenre: IMovie[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    const genreId = this.activatedRoute.snapshot.params['id'];

    if (!genreId) {
      this.router.navigate(['/movies/all']);
      return;
    }

    this.movieService.loadAllMovies().subscribe({
      next: (value) => {
        this.movies = value;
        for (let i = 0; i < this.movies.length; i++) {
          const movie = this.movies[i];
          for (let j = 0; j < movie.genres.length; j++) {
            const genre = movie.genres[j];
            if (genre === genreId) {
              this.moviesByGenre.push(movie);
            }
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}

// {
//   this.movies = value.filter(movie => {
//     movie.genres.forEach(g => {g._id === genreId})
//   });
// }
