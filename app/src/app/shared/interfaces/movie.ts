import { IGenre } from "./genre";

export interface IMovie {
    _id: string;
    genres: IGenre[];
    ranking: string;
    title: string;
    runtime: string;
    year: string;
    released: string;
    director: string;
    writer: string;
    plot: string;
    language: string;
    country: string;
    poster: string;
    trailerLink: string;
    imdbRating: number;
    imdbID: string;
    imdbLink: string;
    userId: string;
    created_at: string;
    updatedAt: string;
}