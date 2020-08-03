export const countActionTypes = {
  ADD: 'ADD',
  ADD_POST: 'ADD_POSTS'
}

export const addCount = () => (dispatch) => {
  return dispatch({ type: countActionTypes.ADD })
}
export const addPosts = () => (dispatch) => {
  return dispatch({ type: countActionTypes.ADD_POST })
}