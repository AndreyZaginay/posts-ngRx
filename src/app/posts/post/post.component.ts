import { Subject, switchMap, takeUntil, Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { selectPost } from './../store/selectors/posts.selectors';
import { Post } from './../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  post$!: Observable<Post>;
  postId!: number;
  
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params) => this.store.select(selectPost(+params['postId']))));      
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toPosts(): void {
    this.router.navigate(['/posts']);
  }
  
  public toUser(userId: number) {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    )      
    .subscribe(params => {
      this.router.navigate([`posts/postId/${params.get('postId')}/userId/${userId}`])
    })
  }
}
