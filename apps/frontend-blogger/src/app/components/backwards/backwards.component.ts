import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'blog-builder-backwards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './backwards.component.html',
  styleUrl: './backwards.component.scss',
})
export class BackwardsComponent implements OnInit {
  @Input() public link!: string;
  @Input() public text!: string;

  constructor() {}

  ngOnInit(): void {
      
  }
}
