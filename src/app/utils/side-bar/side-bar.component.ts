import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { navData } from './navData';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    RouterLink
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  navigations = navData;

  logout(): void {}
}
