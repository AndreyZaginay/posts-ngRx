
import { createAction, props } from '@ngrx/store';
import { Comment } from '../../models/coment';
export const getCommentsActions = createAction('[COMMENTS] get comments');
export const getCommentsActionsSuccess = createAction('[COMMENTS] get comments success', props<{ comments: Comment[] }>());