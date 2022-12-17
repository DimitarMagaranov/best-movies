import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovie } from '../shared/interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  saveMovie(
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
    return this.httpClient.post<IMovie>('/api/movies/create', {title, year, director, writer, poster, trailerLink, imdbRating, imdbLink, plot, genres});
  }

  approveMovie(id: string) {
    return this.httpClient.put<any>(`/api/admin/approveMovie/${id}`, {});
  }

  loadMoviesForApproving() {
    return this.httpClient.get<IMovie[]>(`/api/moviesForApproval/all`);
  }

  loadMovieForApproving(id: string) {
    return this.httpClient.get<IMovie>(`/api/moviesForApproval/${id}`);
  }
}
