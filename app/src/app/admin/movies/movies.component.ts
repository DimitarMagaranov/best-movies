import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from 'src/app/material/confirm-dialog.service';
import { ConfirmDialogComponent } from 'src/app/material/confirm-dialog/confirm-dialog.component';
import { MovieService } from 'src/app/movie/movie.service';
import { IMovie } from 'src/app/shared/interfaces/movie';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['../admin/admin.component.scss','./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: IMovie[] = [];
  allMovies!: IMovie[];
  searchTerm!: string;
  page = 1;
  pageSize = 20;
  collectionSize!: number;
  currentRate = 8;

  isHidden = true;

  constructor(private moviesService: MovieService, private dialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesService.loadAllMovies().subscribe((value) => {
      this.movies = value;
      this.movies = this.movies.sort((a, b) => b.imdbRating - a.imdbRating);
      this.allMovies = this.movies;
      this.collectionSize = this.movies.length;
    });
  }

  deleteMovie(id: string) {
    this.moviesService.deleteMovie(id).subscribe(() => {
      this.movies = this.movies.filter(x => x._id != id);
    })
  };

  search(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    this.movies = this.allMovies.filter((val) => val.title.toLowerCase().includes(value));
    this.collectionSize = this.movies.length;
  }

	getPageSymbol(current: number) {
		return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
	}

	selectPage(page: string) {
		this.page = parseInt(page, 10) || 1;
	}

	formatInput(input: HTMLInputElement) {
		input.value = input.value.replace(FILTER_PAG_REGEX, '');
	}

  showTable() {
    this.isHidden = !this.isHidden;
  }

  handleClick(id: string) {
    const options = {
      title: 'Are you sure you want to delete this movie?',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'YES',
    };
    
    this.dialogService.open(options);
        
    this.dialogService.confirmed().subscribe(confirmed => {
       if (confirmed) {
            this.deleteMovie(id);
          }
        });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
