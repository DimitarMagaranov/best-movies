import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IMovie } from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieList: IMovie[] | null = null;
  errorFetchingData = false;

  constructor(private apiService: ApiService) { }

  getMovieDetailsHandler() {
    console.log();
    
  }

  ngOnInit(): void {
    this.apiService.loadMovies().subscribe({
      next: (value) => {
        this.movieList = value;
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.log(err);
      }
    })
  }

}
