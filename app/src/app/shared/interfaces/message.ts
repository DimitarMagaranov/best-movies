import { IMovie } from "./movie";

export interface IMessage {
    _id: string;
    userId: string;
    movieId: IMovie
};