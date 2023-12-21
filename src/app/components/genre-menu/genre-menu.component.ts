import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-genre-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genre-menu.component.html',
  styleUrls: ['./genre-menu.component.css']
})
export class GenreMenuComponent implements OnInit {
  genres: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchGenres();
  }

  private fetchGenres(): void {
    this.apiService.getGenres().subscribe({
      next: response => this.processGenreResponse(response),
      error: error => console.error('Error fetching genres:', error),
      complete: () => console.log('Genre fetch complete')
    });
  }

  private processGenreResponse(response: any): void {
    this.genres = response.genres;
  }

  goToGenre(event: Event, id: number): void {
    event.preventDefault();
    this.router.navigate(['home', id, 1]).then(() => window.location.reload());
  }
}
