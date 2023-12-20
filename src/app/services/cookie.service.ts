import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly favoritesCookieKey = 'favorites';
  private readonly cookieExpirationDays = 1; // Cookie expiration in days

  constructor(private cookieService: CookieService) {}

  /**
   * Initializes and retrieves the list of favorite IDs from the cookie.
   * @returns {number[]} The array of favorite film IDs.
   */
  initializeFavorites(): number[] {
    const favoritesJson = this.cookieService.get(this.favoritesCookieKey) || '[]';
    return JSON.parse(favoritesJson);
  }

  /**
   * Updates the list of favorite IDs in the cookie.
   * @param {number[]} favorites The array of favorite film IDs to store.
   */
  updateFavorites(favorites: number[]): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + this.cookieExpirationDays);
    this.cookieService.set(this.favoritesCookieKey, JSON.stringify(favorites), { expires, path: '/' });
  }
}
