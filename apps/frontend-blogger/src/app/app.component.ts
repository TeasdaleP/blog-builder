import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [NavigationComponent, FooterComponent, RouterModule],
  selector: 'blog-builder-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(){}
}
