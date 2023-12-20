import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FavoritesService } from '../../services/cookie.service';
import { RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  details: any;
  id: number = 0;
  credits: string[] = [];
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService, 
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadFilmDetails();
    this.checkFavorites();
  }

  private loadFilmDetails(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.fetchFilmDetails();
      this.fetchFilmCredits();
    });
  }

  private fetchFilmDetails(): void {
    this.apiService.getFilmDetails(this.id).subscribe({
      next: response => this.details = response,
      error: error => console.error('Error fetching film details:', error),
      complete: () => console.log('Film details fetch complete')
    });
  }

  private fetchFilmCredits(): void {
    this.apiService.getFilmCredits(this.id).subscribe({
      next: response => this.processFilmCredits(response.cast),
      error: error => console.error('Error fetching film credits:', error),
      complete: () => console.log('Film credits fetch complete')
    });
  }

  private processFilmCredits(cast: { known_for_department: string; name: string }[]): void {
    const actorsList = cast.filter(actor => actor.known_for_department === "Acting").slice(0, 3);
    this.credits = actorsList.map(actor => actor.name);
  }

  private checkFavorites(): void {
    const favorites = this.favoritesService.initializeFavorites();
    this.isFavorite = favorites.includes(this.id);
    this.updateFavoritesIcon();
  }

  private updateFavoritesIcon(): void {
    const favicon = document.getElementById('favoritesIcon');
    if (this.isFavorite) {
      favicon?.classList.add('favorited');
    } else {
      favicon?.classList.remove('favorited');
    }
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.updateFavoritesIcon();
    this.isFavorite ? this.addToFavorite(this.id) : this.removeFromFavorite(this.id);
  }

  private addToFavorite(id: number): void {
    const favorites = this.favoritesService.initializeFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      this.favoritesService.updateFavorites(favorites);
    }
  }

  private removeFromFavorite(id: number): void {
    const favorites = this.favoritesService.initializeFavorites();
    const index = favorites.indexOf(id);
    if (index !== -1) {
      favorites.splice(index, 1);
      this.favoritesService.updateFavorites(favorites);
    }
  }
}
