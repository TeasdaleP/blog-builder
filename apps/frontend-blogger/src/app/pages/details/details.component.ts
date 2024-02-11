import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PhotosComponent } from '../../components/photos/photos.component';
import { BackwardsComponent } from '../../components/backwards/backwards.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { selectUserId } from '../../ngrx/auth';
import { Post } from '../../interface/post.data';
import { selectAllPosts } from '../../ngrx/post';

@Component({
  selector: 'blog-builder-details',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, PhotosComponent, BackwardsComponent, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  public loggedin: boolean = false;
  public post: Post | undefined;
  public id!: string;

  public id$: Observable<string | undefined>;
  public posts$: Observable<Post[]>;

  private destroyed$: ReplaySubject<void> = new ReplaySubject();
  
  constructor(private store: Store, private route: ActivatedRoute) {
    this.id$ = this.store.select(selectUserId).pipe(takeUntil(this.destroyed$));
    this.posts$ = this.store.select(selectAllPosts).pipe(takeUntil(this.destroyed$));

    this.route.params.subscribe((params) => { this.id = params['id'] });
  }

  ngOnInit(): void {
    this.id$.subscribe((id) => this.loggedin = id ? true : false);
    this.posts$.subscribe((posts) => {
      this.post = posts.find((post) => post.id === this.id);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}