import { PostsState } from './../../models/post';
import { createReducer, on, createFeature } from '@ngrx/store';
import * as PostsActions from '../actions/posts.actions'

export const initialState: PostsState = {
    postList: [],
    isLoading: false,
}

export const postsFeature = createFeature({
    name: 'posts',
    reducer: createReducer(
        initialState,
        on(PostsActions.getPostsActions, (state) => {
            return { ...state, isLoading: true}
        }),
        on(PostsActions.getPostsActionsSuccess, (state, { posts }) => ({
            ...state, postList: posts, isLoading: false
        })),
        // on(PostsActions.getSortedPostListActions, (state) => {
        //     return { ...state, postList: [...state.postList].sort((a, b) => b.id - a.id) }
        // }),
        // on(PostsActions.getFilteredPostListByOddId, (state) => {
        //     return { ...state, postList: state.postList.filter(({ id }) => id % 2 === 0)}
        // }),
        // on(PostsActions.getFilteredPostListByEvenId, (state) => {
        //     return { ...state, postList: state.postList.filter(({ id }) => id % 2 !== 0)}
        // })
    )
})

export const {
    name,
    reducer,
    selectPostsState,
    selectPostList,
} = postsFeature