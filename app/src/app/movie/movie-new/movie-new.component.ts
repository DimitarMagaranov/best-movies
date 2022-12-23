import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { IGenre } from 'src/app/shared/interfaces/genre';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['../../auth/login/login.component.scss', './movie-new.component.scss'],
})
export class MovieNewComponent implements OnInit {
  alert: boolean = false;
  dropdownSettings: IDropdownSettings = {};
  dropDownForm!: FormGroup;

  genres: IGenre[] = [];
  selectedGenres!: IGenre[];

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
      next: () => {
        this.alert = true;
        form.reset();
        window.scrollTo(0, 0);
      },
      error: () => {
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

  closeAlert() {
    this.alert = false;
    this.router.navigate([`/`]);
  }
}
