import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.httpClient.get<IMovie[]>(`/api/movies/all`);
  }

  loadMovieById(id: string) {
    return this.httpClient.get<IMovie>(`/api/movies/${id}`);
  }

  // loadMoviesByGenreId(id: string) {
  //   return this.httpClient.get<IMovie[]>(`/api/movies/byGenre/${id}`);
  // }

  loadAllGenres() {
    return this.httpClient.get<IGenre[]>('/api/genres');
  }

  loadGenreById(id: string) {
    console.log(id);
    
    return this.httpClient.get<IGenre>(`/api/genres/${id}`);
  }

  createMovie(
    title: string,
    year: string,
    director: string,
    writer: string,
    poster: string,
    trailerLink: string,
    imdbRating: number,
    imdbLink: string,
    plot: string,
    genres: string[]
  ) {
    return this.httpClient.post<IMovie>('/api/moviesForApproval/create', {title, year, director, writer, poster, trailerLink, imdbRating, imdbLink, plot, genres});
  }

  deleteMovie(id: string) {
    return this.httpClient.delete(`/api/movies/${id}`);
  }
}
