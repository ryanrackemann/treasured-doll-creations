import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { SiteHeaderComponent } from './shared/site-header/site-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SiteHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
