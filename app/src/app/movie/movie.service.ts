import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGenre } from '../shared/interfaces/genre';
import { IMovie } from '../shared/interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  loadMovies(currPage: string) {
    return this.httpClient.get<IMovie[]>(`/api/movies?page=${currPage}`); 
  }

  loadAllMovies() {
    return this.httpClient.get<IMovie[]>(`/api/movies`);
  }

  loadMovieById(id: string) {
    return this.httpClient.get<IMovie>(`/api/movies/${id}`);
  }

  loadAllGenres() {
    return this.httpClient.get<IGenre[]>('/api/genres');
  }
}
