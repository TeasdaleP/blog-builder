import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BackwardsComponent } from '../../components/backwards/backwards.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { selectIsLoggedIn } from '../../ngrx/auth';
import { Post } from '../../interface/post.data';
import { selectAllPosts } from '../../ngrx/post';
import { EmptyComponent } from '../../components/empty/empty.component';
import { Comment } from '../../interface/comment.data';
import { CommentComponent } from '../../components/comment/comment.component';
import { getComments, selectComments } from '../../ngrx/comments';

@Component({
  selector: 'blog-builder-details',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, BackwardsComponent, RouterModule, EmptyComponent, CommentComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  public post: Post | undefined;
  public id!: string;

  public posts$: Observable<Post[]>;
  public loggedIn$: Observable<boolean>;
  public comments$: Observable<Comment[]>;

  private destroyed$: ReplaySubject<void> = new ReplaySubject();
  
  constructor(private store: Store, private route: ActivatedRoute) {
    this.comments$ = this.store.select(selectComments).pipe(takeUntil(this.destroyed$));
    this.loggedIn$ = this.store.select(selectIsLoggedIn).pipe(takeUntil(this.destroyed$));
    this.posts$ = this.store.select(selectAllPosts).pipe(takeUntil(this.destroyed$));

    this.route.params.subscribe((params) => { this.id = params['id'] });
  }

  ngOnInit(): void {
    this.store.dispatch(getComments({ postId: this.id }));
    this.posts$.subscribe((posts) => {
      this.post = posts.find((post) => post.id === this.id);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}