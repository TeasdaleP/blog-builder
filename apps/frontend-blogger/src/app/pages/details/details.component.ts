import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BackwardsComponent } from '../../components/backwards/backwards.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, combineLatest, map, switchMap, take, takeUntil } from 'rxjs';
import { selectIsLoggedIn } from '../../ngrx/auth';
import { Post } from '../../interface/post.data';
import { selectAllPosts } from '../../ngrx/post';
import { EmptyComponent } from '../../components/empty/empty.component';
import { Comment } from '../../interface/comment.data';
import { CommentComponent } from '../../components/comment/comment.component';
import { getComments, selectComments } from '../../ngrx/comments';
import { AddCommentComponent } from '../../components/add-comment/add-comment.component';
import { addComment } from '../../ngrx/comments/comments.actions';

@Component({
  selector: 'blog-builder-details',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, BackwardsComponent, RouterModule, EmptyComponent, CommentComponent, AddCommentComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  public post: Post | undefined;
  public id!: string;

  public post$: Observable<Post | undefined>;
  public loggedIn$: Observable<boolean>;
  public comments$: Observable<Comment[]>;

  private destroyed$ = new ReplaySubject<void>();
  
  constructor(private store: Store, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => { this.id = params['id'] }); 

    this.comments$ = this.store.select(selectComments).pipe(takeUntil(this.destroyed$));
    this.loggedIn$ = this.store.select(selectIsLoggedIn).pipe(takeUntil(this.destroyed$));
    this.post$ = this.store.select(selectAllPosts).pipe(takeUntil(this.destroyed$),
      map((posts) => posts.find((post) => post.id === this.id ))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(getComments({ postId: this.id }));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public handleAddComment(event: string): void {
    this.store.dispatch(addComment({ comment: event, postId: this.id }));
  } 
}