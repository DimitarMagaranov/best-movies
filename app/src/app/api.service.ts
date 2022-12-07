import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovie } from './shared/interfaces/movie';
import { environment } from '../environments/environment';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  loadMovies() {
    return this.httpClient.get<IMovie[]>(`${apiURL}/movies`);
  }

  loadMovieById(id: string) {
    return this.httpClient.get<IMovie>(`${apiURL}/movies/${id}`);
  }
}
