import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.scss']
})
export class MovieNewComponent {

  constructor() { }

  newMovieHandler(form: NgForm): void {
    if (form.invalid) { return; }

    console.log(form.value);
    
  }
}
