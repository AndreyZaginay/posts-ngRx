import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Post } from './models/post';
import * as PostsActions from './store/actions/posts.actions';
import { selectPostsList, selectIsLoading, selectOddList, selectEvenList, selectBytitleLengthList, selectPostsByInputValue, selectPostByGreatestId } from './store/selectors/posts.selectors';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]> = this.store.select(selectPostsList);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPostsActions());    
  }
  
  public sort(): void {
    // this.store.dispatch(PostsActions.getSortedPostListActions())
    this.posts$ = this.store.select(selectPostByGreatestId)
  }

  public showAll(): void {
    this.store.dispatch(PostsActions.getPostsActions());  
    this.posts$ = this.store.select(selectPostsList)
  }

  public filterOddId(): void {
    this.posts$ = this.store.select(selectOddList)
    // this.store.dispatch(PostsActions.getFilteredPostListByOddId())
  }

  public filterEvenId(): void {
    this.posts$ = this.store.select(selectEvenList)
    // this.store.dispatch(PostsActions.getFilteredPostListByEvenId())
  }

  public filterByInputValue(value: string): void {
    this.posts$ = this.store.select(selectPostsByInputValue(value))
  }

  public filterByTitle(): void {
    this.posts$ = this.store.select(selectBytitleLengthList)
  }

  public postInfo(postId: number): void {
    this.router.navigate([`posts/postId/${postId}`]);
  }
}
