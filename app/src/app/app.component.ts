import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  movies: string[] = [];

  ngOnInit(): void {
    if (!localStorage.getItem('moviesSavedList')) {
      localStorage.setItem('moviesSavedList', JSON.stringify(this.movies));
      sessionStorage.setItem('list-view', 'cards');
    }
  }
  title = 'app';
}
