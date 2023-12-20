import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { GenreMenuComponent } from '../genre-menu/genre-menu.component';
import { FilmsComponent } from '../films/films.component';
import { TopnavComponent } from '../topnav/topnav.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, GenreMenuComponent, FilmsComponent, TopnavComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'movies-project';
}
