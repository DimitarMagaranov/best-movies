import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/shared/interfaces/movie';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-movies-to-approve',
  templateUrl: './movies-to-approve.component.html',
  styleUrls: ['../admin/admin.component.scss','./movies-to-approve.component.scss']
})
export class MoviesToApproveComponent {
  messages!: string[];
  moviesForApproving! : IMovie[];

  isHidden = true;
  
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

  showTable() {
    this.isHidden = !this.isHidden;
  }
}
