import { Component, OnInit } from '@angular/core';
import { IGenre } from 'src/app/shared/interfaces/genre';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-genre-filter',
  templateUrl: './genre-filter.component.html',
  styleUrls: ['./genre-filter.component.scss'],
})
export class GenreFilterComponent implements OnInit {
  genres: IGenre[] = [];
  dropdownSettings: IDropdownSettings = {};

  errorFetchingData = false;

  constructor(private movieService: MovieService, private router: Router) {}

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
      textField: 'title',
      singleSelection: true,
    };
  }

  selectGenreHandler(value: any) {
    const genre = value as IGenre;
    this.router.navigate([`/movies/byGenre/${genre._id}`]);
  }
}
