import { RouterModule, Routes } from "@angular/router";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieListByGenreComponent } from "./movie-list-by-genre/movie-list-by-genre.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieNewComponent } from "./movie-new/movie-new.component";

const routes: Routes = [
    {
        path: 'all',
        component: MovieListComponent
    },
    {
        path: 'new',
        component: MovieNewComponent
    },
    {
        path: 'details/:id',
        component: MovieDetailsComponent
    },
    {
        path: 'byGenre/:id',
        component: MovieListByGenreComponent
    }
];

export const MovieRoutingModule = RouterModule.forChild(routes);