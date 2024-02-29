import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../interface/comment.data';

@Component({
  selector: 'blog-builder-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  @Input() public comment: Comment | undefined;

  constructor() {}

  ngOnInit(): void {
      
  }

}
