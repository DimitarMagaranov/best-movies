import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { MoviePreviewComponent } from "./movie-preview/movie-preview.component";

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'movie-preview/:id',
        component: MoviePreviewComponent
    }
];

export const AdminRoutingModule = RouterModule.forChild(routes);