import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FavoritesService } from '../../services/cookie.service';
import { Observable, forkJoin } from 'rxjs';

type ApiServiceFunction = keyof ApiService;

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  films: any[] = [];
  favorites: number[] = [];

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService, 
    private router: Router, 
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['isFavoritesList']) {
        this.favorites = this.favoritesService.initializeFavorites();
        this.fetchFavoriteFilms();
      } else {
        const fetchFnName: ApiServiceFunction = data['fetchFilmsFn'];
        this.fetchFilms(fetchFnName);
      }
    });
  }

  private fetchFilms(fetchFnName: ApiServiceFunction): void {
    
    const fetchFn = this.apiService[fetchFnName];
    if (typeof fetchFn === 'function') {
      (fetchFn as () => Observable<any>)().subscribe({
        next: response => this.films = response.results,
        error: error => console.error('Error fetching films:', error),
        complete: () => console.log('Film fetch complete')
      });
    }
  }

  private fetchFavoriteFilms(): void {
    const apiRequests = this.favorites.map(favorite => this.apiService.getFilmDetails(favorite));
    forkJoin(apiRequests).subscribe({
      next: responses => this.films = responses,
      error: error => console.error('Error fetching favorite films:', error),
      complete: () => console.log('Favorite films fetch complete')
    });
  }

  goToFilmDetails(id: number): void {
    this.router.navigate(['movie', id]).then(() => window.location.reload());
  }
}
