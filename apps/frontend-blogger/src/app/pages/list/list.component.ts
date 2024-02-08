import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'blog-builder-list',
  standalone: true,
  imports: [CommonModule, HeroComponent, PostComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  public title!: string;
  public subtitle!: string;

  constructor() {}

  ngOnInit() {
    this.title = 'welcome to the blog!';
  }
}
