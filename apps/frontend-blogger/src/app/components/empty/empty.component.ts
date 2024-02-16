import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-builder-empty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss',
})
export class EmptyComponent implements OnInit {
  @Input() public title: string | undefined;
  @Input() public subtitle: string | undefined;
  @Input() public type: string | undefined;
  
  constructor() {}

  ngOnInit(): void {
      
  }
}
