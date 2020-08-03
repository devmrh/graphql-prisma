import { countActionTypes } from './action';

const countInitialState = {
  count: 0,
  posts: []
}


export default function reducer(state = countInitialState, action){
  console.log(action);
  switch (action.type){
    case countActionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count+1
      })
    case countActionTypes.ADD_POST:
      return Object.assign({}, state, {
        posts: action.posts
      })

     default:
        return state;
  }
}