import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'blog-builder-tags',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tags.component.html',
    styleUrl: './tags.component.scss',
  })
  export class TagsComponent implements OnInit {
    @Input() public name: string | undefined;

    constructor() {
  
    }

    ngOnInit(): void {
    
    }
  }