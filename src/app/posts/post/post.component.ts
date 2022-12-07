import { selectPost } from './../store/selectors/posts.selectors';
import { Subject, switchMap, takeUntil, Observable, tap } from 'rxjs';
import { Post, PostsState } from './../models/post';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post$!: Observable<Post>;
  postId!: number;
  // postComments$: Observable<Comment[]>

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params) => this.store.select(selectPost(+params['id']))));      
  }
  
  public toPosts(): void {
    this.router.navigate(['/posts']);
  }
  
  public toUser(userId: number) {
    this.router.navigate([`posts/userId/${userId}`]);  
  }
}
