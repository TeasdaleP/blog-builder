import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PhotosComponent } from '../../components/photos/photos.component';

@Component({
  selector: 'blog-builder-details',
  standalone: true,
  imports: [CommonModule, PhotosComponent, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  public image: string = 'https://www.stockvault.net/data/2020/01/18/272608/thumb16.jpg';
  public photos: Array<string> = [
    'https://www.stockvault.net/data/2020/01/18/272608/thumb16.jpg',
    'https://www.stockvault.net/data/2020/01/18/272608/thumb16.jpg',
    'https://www.stockvault.net/data/2020/01/18/272608/thumb16.jpg'
  ]

  constructor() {}

  ngOnInit(): void {
      
  }

  scrollTo(place: string) {}
}
