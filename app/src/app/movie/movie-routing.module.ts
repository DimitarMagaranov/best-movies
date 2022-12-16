import { RouterModule, Routes } from "@angular/router";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieNewComponent } from "./movie-new/movie-new.component";
import { SavedMoviesComponent } from "./saved-movies/saved-movies.component";

const routes: Routes = [
    {
        path: 'all',
        children: [
            {
                path: '',
                component: MovieListComponent
            },
            {
                path: 'byGenre/:id',
                component: MovieListComponent
            }
        ]
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
        path: 'saved',
        component: SavedMoviesComponent
    }
];

export const MovieRoutingModule = RouterModule.forChild(routes);