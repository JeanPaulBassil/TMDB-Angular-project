import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: any[] = [];
  genre: number = 0;
  pagenum: number = 1;

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.extractRouteParameters();
    this.fetchFilms();
  }

  private extractRouteParameters(): void {
    this.route.params.subscribe(params => {
      this.genre = +params['genre'];
      this.pagenum = +params['page'];
    });
  }

  private fetchFilms(): void {
    this.apiService.getFilms(this.genre, this.pagenum).subscribe({
      next: response => this.processFilmResponse(response),
      error: error => console.error('Error fetching films:', error),
      complete: () => console.log('Film fetch complete')
    });
  }

  private processFilmResponse(response: any): void {
    this.films = response.results;
  }

  goToFilmDetails(id: number): void {
    this.router.navigate(['movie', id]).then(() => window.location.reload());
  }
}
