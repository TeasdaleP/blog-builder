import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-builder-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent implements OnInit {
  @Input() public photos!: Array<string>;
  public selected: Array<number> = [];

  constructor() {
    
  }

  ngOnInit(): void {}

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
