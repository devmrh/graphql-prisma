import { countActionTypes } from './action';

const countInitialState = {
  count: 0,
  posts: []
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
    case countActionTypes.GET_POSTS:
      console.log("im fuck", action?.payload);
      // return {
      //   ...state,
      //   posts: [action.payload, ...state.posts]
      // };
      if(action.payload != null || action.payload !== "undefined"){
        console.log("catrched", action.payload);
        return Object.assign({}, state, {
          posts: action.payload
        })

      }

     default:
        return state;
  }
}