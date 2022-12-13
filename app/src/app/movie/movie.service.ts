import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
