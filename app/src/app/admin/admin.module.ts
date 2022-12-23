import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';
import { CoreModule } from '../core/core.module';
import { MoviesToApproveComponent } from './movies-to-approve/movies-to-approve.component';
import { UsersComponent } from './users/users.component';
import { MoviesComponent } from './movies/movies.component';
import { ListFilterPipeForMovies } from '../shared/pipes/listFilterPipeForMovies';
import { ListFilterPipeForUsers } from '../shared/pipes/listFilterPipeForUsers';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    AdminComponent,
    MoviePreviewComponent,
    MoviesToApproveComponent,
    UsersComponent,
    MoviesComponent,
    ListFilterPipeForMovies,
    ListFilterPipeForUsers,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    CoreModule,
    NgbModule,
    FormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
