import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getGenres = (): Observable<any> => {
    const url = `${this.baseUrl}/genre/movie/list?language=en`;
    return this.http.get(url, { headers: this.createHeaders() }).pipe(catchError(this.handleError));
  }

  getFilms = (genre: number, pagenum: number): Observable<any> => {
    const url = `${this.baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pagenum}&sort_by=popularity.desc&with_genres=${genre}`;
    return this.http.get(url, { headers: this.createHeaders() }).pipe(catchError(this.handleError));
  }

  getFilmDetails = (id: number): Observable<any> => {
    const url = `${this.baseUrl}/movie/${id}?language=en-US`;
    return this.http.get(url, { headers: this.createHeaders() }).pipe(catchError(this.handleError));
  }

  getFilmCredits = (id: number): Observable<any> => {
    const url = `${this.baseUrl}/movie/${id}/credits?language=en-US`;
    return this.http.get(url, { headers: this.createHeaders() }).pipe(catchError(this.handleError));
  }

  getPlaying = (): Observable<any> => {
    const url = `${this.baseUrl}/movie/now_playing?language=en-US&page=1`;
    return this.http.get(url, { headers: this.createHeaders() }).pipe(catchError(this.handleError));
  }

  getPopular = (): Observable<any> => {
    const url = `${this.baseUrl}/movie/popular?language=en-US&page=1`;
    return this.http.get(url, { headers: this.createHeaders() }).pipe(catchError(this.handleError));
  }

  getToprated = (): Observable<any> => {
    const url = `${this.baseUrl}/movie/top_rated?language=en-US&page=1`;
    return this.http.get(url, { headers: this.createHeaders() }).pipe(catchError(this.handleError));
  }

  getUpcoming = (): Observable<any> => {
    const url = `${this.baseUrl}/movie/upcoming?language=en-US&page=1`;
    return this.http.get(url, { headers: this.createHeaders() }).pipe(catchError(this.handleError));
  }

  search = (query: string): Observable<any> => {
    const url = `${this.baseUrl}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    return this.http.get(url, { headers: this.createHeaders() }).pipe(catchError(this.handleError));
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${environment.apiKey}` });
  }

  private handleError(error: any) {
    return throwError(error.message || 'Server Error');
  }
}
