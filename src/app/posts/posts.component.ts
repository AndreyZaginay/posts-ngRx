import { selectPostsList } from './store/selectors/posts.selectors';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Post, PostsState } from './models/post';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PostsActions from './store/actions/posts.actions';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]> = this.store.select(selectPostsList);
  // isLoading$: Observable<boolean> = this.store.select()

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPostsActions());    
  }

  public postInfo(postId: number): void {
    this.router.navigate([`posts/postId/${postId}`]);
  }
}
