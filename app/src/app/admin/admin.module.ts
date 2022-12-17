import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    AdminComponent,
    MoviePreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
