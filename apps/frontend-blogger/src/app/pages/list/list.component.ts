import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { PostComponent } from '../../components/post/post.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { EmptyComponent } from '../../components/empty/empty.component';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Post } from '../../interface/post.data';
import { Store } from '@ngrx/store';
import { getAllPosts, selectAllPosts } from '../../ngrx/post';

@Component({
  selector: 'blog-builder-list',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, HeroComponent, PostComponent, EmptyComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  public posts$: Observable<Post[]>;

  private destroyed$ = new ReplaySubject<void>();

  constructor(private store: Store) {
    this.posts$ = this.store.select(selectAllPosts).pipe(takeUntil(this.destroyed$));
  }

  ngOnInit() {
    this.store.dispatch(getAllPosts());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
