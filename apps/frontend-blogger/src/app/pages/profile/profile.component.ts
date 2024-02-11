import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackwardsComponent } from '../../components/backwards/backwards.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';

@Component({
  selector: 'blog-builder-profile',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, BackwardsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
      
  }
}
