import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  genre: number = 0;
  pagenum: number = 1;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.extractRouteParameters();
  }

  private extractRouteParameters(): void {
    this.route.params.subscribe(params => {
      this.genre = +params['genre'] || this.genre;
      this.pagenum = +params['page'] || this.pagenum;
    });
  }

  goToPrevious(event: Event): void {
    event.preventDefault();
    this.navigateToPage(Math.max(this.pagenum - 1, 1));
  }

  goToNext(event: Event): void {
    event.preventDefault();
    this.navigateToPage(this.pagenum + 1);
  }

  private navigateToPage(page: number): void {
    this.router.navigate(['home', this.genre, page]).then(() => {
      window.location.reload();
    });
  }
}
