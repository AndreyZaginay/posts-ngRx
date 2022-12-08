import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UserModule } from './user/user.module';
import { UserComponent } from './user/user.component';
import { PostsService } from './services/posts.service';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { postsFeature } from './store/reducers/posts.reducers';
import { PostsEffects } from './store/effects/posts.effects';
import { CommentsModule } from './comments/comments.module';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
   path: '', 
   component: PostsComponent,
  },
  {
    path: 'postId/:postId',
    component: PostComponent
  },
  {
    path: 'postId/:postId/userId/:userId',
    component: UserComponent
  }
]

@NgModule({
    declarations: [
        PostsComponent,
        PostComponent,
    ],
    providers: [PostsService],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(postsFeature),
        EffectsModule.forFeature([PostsEffects]),
        CommentsModule,
        UserModule
    ]
})
export class PostsModule { }
