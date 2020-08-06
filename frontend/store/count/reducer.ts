import { countActionTypes } from './action';

const countInitialState = {
  count: 0,
  users: []
}


export default function reducer(state = countInitialState, action){
//  console.log(action);
  switch (action.type){
    case countActionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count+1
      })
    case countActionTypes.ADD_POST:
      return Object.assign({}, state, {
        posts: action.posts
      })
    case countActionTypes.SET_USERS:
     // console.log("look at me", action.payload);
      return Object.assign({}, state, {
        users: action.payload
      })
    case countActionTypes.GET_USERS:
      // return {
      //   ...state,
      //   posts: [action.payload, ...state.posts]
      // };
      return Object.assign({}, state, {
        users: action.payload
      })

    default:
        return state;
  }
}