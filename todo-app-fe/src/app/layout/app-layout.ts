import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app-layout.html',
})
export class AppLayoutComponent {
  
  constructor(private router: Router) {
  }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }

  logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
