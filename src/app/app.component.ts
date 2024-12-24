import { Component } from '@angular/core';
import { HomePageComponent } from './Components/home-page/home-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'find-n-replace-tool';
}
