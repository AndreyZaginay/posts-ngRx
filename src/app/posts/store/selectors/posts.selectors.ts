import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from '../../models/post';
import { postsFeature } from '../reducers/posts.reducers';

export const selectPostsList = createSelector(
    postsFeature.selectPostList, 
    (postsList) => postsList
)

export const selectPostByGreatestId = createSelector(
    selectPostsList,
    postList => [...postList].sort((a, b) => b.id - a.id)
)

export const selectOddList = createSelector(
    selectPostsList,
    postsList => postsList.filter(({ id }) => id % 2 === 0)
)

export const selectEvenList = createSelector(
    selectPostsList,
    postsList => postsList.filter(({ id }) => id % 2 !== 0)
)

export const selectBytitleLengthList = createSelector(
    selectPostsList,
    postsList => [...postsList].sort((a, b) => a.title.split('').length - b.title.split('').length)
)

export const selectPostsByInputValue = (value: string) => {
    return createSelector(selectPostsList, postsList => postsList.filter(({ title }) => title.includes(value))); 
}

// title.split('').filter(i => i !== ' ').join('').includes(value)

export const selectPost = (id: number) => {
    return createSelector(selectPostsList, ( postList => postList.find(post => post.id === id)!))
}


export const selectIsLoading = createSelector(
    postsFeature.selectIsLoading,
    isloading => isloading
)