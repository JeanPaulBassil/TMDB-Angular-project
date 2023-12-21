import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  films: any[] = [];
  pagenum: number = 1;
  query: string = '';

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.extractRouteParameters();
    this.performSearch();
  }

  private extractRouteParameters(): void {
    this.route.params.subscribe(params => {
      this.query = params['query'] || this.query;
      this.pagenum = +params['page'] || this.pagenum;
    });
  }

  private performSearch(): void {
    if (this.query) {
      this.apiService.search(this.query).subscribe({
        next: response => this.processFilmResponse(response),
        error: error => console.error('Error fetching films:', error),
        complete: () => console.log('Film fetch complete')
      });
    }
  }

  private processFilmResponse(response: any): void {
    this.films = response.results;
  }

  goToFilmDetails(id: number): void {
    this.router.navigate(['movie', id]).then(() => window.location.reload());
  }
}
