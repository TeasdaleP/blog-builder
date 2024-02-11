import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'blog-builder-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(){}
}
