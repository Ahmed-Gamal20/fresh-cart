import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav-blanck',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blanck.component.html',
  styleUrl: './nav-blanck.component.scss'
})
export class NavBlanckComponent {

  readonly _AuthService=inject(AuthService)
}
