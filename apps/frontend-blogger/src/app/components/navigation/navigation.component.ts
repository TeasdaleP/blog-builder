import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'blog-builder-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  @Input() loggedin: boolean = false;
  @Input() photo: string | undefined; 
  public open: boolean = false;
  
  constructor(){}

  ngOnInit(): void {}

  toggleNavigation() {
    this.open = !this.open;
  }
}
