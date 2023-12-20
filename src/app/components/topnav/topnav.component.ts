import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [FormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent {
  searchText: string = '';

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]).then(() => window.location.reload());
  }

  search(event: Event): void {
    event.preventDefault();
    if (this.searchText) {
      this.router.navigate(['search', this.searchText, 1]).then(() => window.location.reload());
    }
  }
}

