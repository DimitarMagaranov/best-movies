import { RouterModule, Routes } from "@angular/router";
import { AdminActivate } from "../shared/guards/admin.activate";
import { AuthActivate } from "../shared/guards/auth.activate";
import { AdminComponent } from "./admin/admin.component";
import { MoviePreviewComponent } from "./movie-preview/movie-preview.component";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthActivate, AdminActivate],
        data: {
            loginRequired: true,
            adminRequired: true
        }
    },
    {
        path: 'movie-preview/:id',
        component: MoviePreviewComponent,
        canActivate: [AuthActivate, AdminActivate],
        data: {
            loginRequired: true,
            adminRequired: true
        }
    }
];

export const AdminRoutingModule = RouterModule.forChild(routes);