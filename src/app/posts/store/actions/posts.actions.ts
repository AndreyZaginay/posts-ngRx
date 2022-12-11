import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post';

export const getPostsActions = createAction('[POSTS] get posts');
export const getPostsActionsSuccess = createAction('[POSTS] get posts success', props<{posts: Post[]}>());

export const getSortedPostListActions = createAction('[POSTS] get sorted posts');
export const getFilteredPostListByOddId = createAction('[POSTS] get posts by odd id');
export const getFilteredPostListByEvenId = createAction('[POSTS] get posts by even id');
