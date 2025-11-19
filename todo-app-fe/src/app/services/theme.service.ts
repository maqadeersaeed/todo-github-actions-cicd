import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  toggle() {
    document.body.classList.toggle('dark-theme');
  }

  setDark() {
    document.body.classList.add('dark-theme');
  }

  setLight() {
    document.body.classList.remove('dark-theme');
  }

  isDark(): boolean {
    return document.body.classList.contains('dark-theme');
  }
}
