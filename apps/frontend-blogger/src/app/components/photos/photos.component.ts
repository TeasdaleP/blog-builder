import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'blog-builder-photos',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent implements OnInit {
  @Input() public photos!: Array<string>;
  public selected: Array<number> = [];
  public slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};

  constructor() {
    
  }

  ngOnInit(): void {}

  slickInit(e: any) {  
  }
  
  breakpoint(e: any) {
  }
  
  afterChange(e: any) {
  }
  
  beforeChange(e: any) {
  }

  selectImage(index: number): void {
    if(!this.selected.includes(index)) {
      this.selected.push(index);
    } else {
      const array = this.selected;
      this.selected = array.filter(function(ele){ 
        return ele != index; 
      });
    }
  }

  selectedImage(index: number): boolean {
    return this.selected.includes(index) ? true : false;
  }
}
