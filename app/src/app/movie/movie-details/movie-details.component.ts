import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { IMovie } from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: IMovie | null = null;
  errorFetchingData = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private apiService: ApiService) {
    
   }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params);
    
    const movieId = this.activatedRoute.snapshot.params['id'];
    
    if(!movieId) {this.router.navigate(['/movies/all']); return; }

    this.apiService.loadMovieById(movieId).subscribe({
      next: (value) => {
        this.movie = value;
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.log(err);
      }
    })
  }

}
