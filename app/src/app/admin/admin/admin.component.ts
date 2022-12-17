import { Component } from '@angular/core';
import { IMovie } from 'src/app/shared/interfaces/movie';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  messages!: string[];
  moviesForApproving! : IMovie[];
  
  constructor(private adminService: AdminService) {
    this.loadMoviesForApproving();
  }

  // movies
  loadMoviesForApproving() {
    this.adminService.loadMoviesForApproving().subscribe({
      next: (value) => {
        this.moviesForApproving = value.filter(x => x.isApproved == false);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getImdbLink(id: string): string {
    return `https://www.imdb.com/title/${id}/?ref_=hm_tpks_tt_i_3_pd_tp1_pbr_ic`;
  }
}
