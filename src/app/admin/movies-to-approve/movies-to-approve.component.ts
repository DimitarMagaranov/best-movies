import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

import { IMovie } from 'src/app/shared/interfaces/movie';
import { AdminService } from '../admin.service';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('500ms ease-in', style({opacity: 1})),
]);
const exitTransition = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate('500ms ease-out', style({opacity: 0})),
]);
const fadeIn = trigger('fadeIn', [enterTransition]);
const fadeOut = trigger('fadeOut', [exitTransition]);

@Component({
  selector: 'app-movies-to-approve',
  templateUrl: './movies-to-approve.component.html',
  styleUrls: ['../admin/admin.component.scss','./movies-to-approve.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class MoviesToApproveComponent {
  messages!: string[];
  moviesForApproving! : IMovie[];
  isHidden = true;
  
  constructor(private adminService: AdminService) {
    this.loadMoviesForApproval();
  }

  // movies
  loadMoviesForApproval() {
    this.adminService.loadMoviesForApproval().subscribe({
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

  fadeInOut() {
    this.isHidden = !this.isHidden;
  }
}
