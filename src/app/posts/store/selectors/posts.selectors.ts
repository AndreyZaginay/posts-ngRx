import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from '../../models/post';
import { postsFeature } from '../reducers/posts.reducers';

export const selectPostsList = createSelector(
    postsFeature.selectPostList, 
    (postsList) => postsList)


export const selectPost = (id: number) => {
    return createSelector(postsFeature.selectPostList, ( postList => postList.find(post => post.id === id)!))
}

export const selectIsLoading = createSelector(
    postsFeature.selectIsLoading,
    isloading => isloading
)