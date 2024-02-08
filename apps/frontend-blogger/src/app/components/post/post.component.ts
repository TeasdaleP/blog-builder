import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-builder-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  @Input() public id!: string;
  @Input() public title!: string;
  @Input() public description!: string;
  @Input() public image!: string | undefined;

  constructor(private route: Router) {}

  ngOnInit(): void {
      
  }

  public readMore(): void {
    this.route.navigate(['details', this.id])
  }
}
