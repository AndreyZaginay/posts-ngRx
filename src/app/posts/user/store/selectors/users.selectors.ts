import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersFeature } from '../reducers/users.reducers'


export const selectUsersList = createSelector(
  usersFeature.selectUserList,
  userList => userList
);


export const selectUser = (userId: number) => {
  return  createSelector(selectUsersList, ((userList) => userList.find(user => user.id === userId)!))
}

export const selectIsloading = createSelector(
  usersFeature.selectIsLoading,
  isLoading => isLoading
)

