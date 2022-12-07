import { CommentsState } from '../../models/coment';
import { createReducer, on, createFeature } from '@ngrx/store';
import * as CommentsActions from '../actions/comments.actions';


export const initialState: CommentsState = {
    commentList: [],
    isLoading: false,
}

export const commentsFeature = createFeature(
    {
        name: 'comments',
        reducer: createReducer(
            initialState,
            on(CommentsActions.getCommentsActions, (state) => {
                return { ...state, isLoading: true}
            }),
            on(CommentsActions.getCommentsActionsSuccess, (state , { comments }) => ({
                ...state, commentList: comments, isLoading: false
            }))
        )
    }
)

export const {
    name,
    reducer,
    selectCommentsState,
    selectCommentList
} = commentsFeature