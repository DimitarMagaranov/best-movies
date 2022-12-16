import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { IGenre } from 'src/app/shared/interfaces/genre';
import { MovieService } from '../movie.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['../../auth/login/login.component.scss'],
})
export class MovieNewComponent implements OnInit {
  dropdownSettings: IDropdownSettings = {};
  dropDownForm!: FormGroup;

  genres: IGenre[] = [];
  selectedGenres!: IGenre[];

  errorFetchingData = false;

  constructor(private movieService: MovieService, private fb: FormBuilder, private router: Router) {}

  newMovieHandler(form: NgForm): void {
    if (form.invalid || this.dropDownForm.value['myItems'] === null) {
      return;
    }

    this.selectedGenres = this.dropDownForm.value['myItems'];
    const genresIds = this.selectedGenres.map(x => x._id);
    

    const {
      title,
      year,
      director,
      writer,
      poster,
      trailerLink,
      imdbRating,
      imdbLink,
      plot,
    } = form.value;

    // const value = { ...form.value, genres: this.selectedGenres };
    this.movieService.createMovie(title,year,director,writer,poster,trailerLink,imdbRating,imdbLink,plot, genresIds)
    .subscribe({
      next: (movie) => {
        console.log(movie);
        
        this.router.navigate([`/movies/details/${movie._id}`]);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/']);
      }
    })
  }

  ngOnInit(): void {
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
      textField: 'title'
    };

    this.dropDownForm = this.fb.group({
      myItems: this.selectedGenres,
    });
  }
}
