import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { IGenre } from 'src/app/shared/interfaces/genre';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.scss']
})
export class MovieNewComponent implements OnInit {

  genres: IGenre[] | null = null;
  errorFetchingData = false;

  constructor(private movieService: MovieService) {
  }
  

  newMovieHandler(form: NgForm): void {
    if (form.invalid) { return; }
    

    console.log(form.value);
    
  }

  ngOnInit(): void {
    this.movieService.loadAllGenres().subscribe({
      next: (value) => {
        this.genres = value;
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.log(err);
      }
    })
  }
}
