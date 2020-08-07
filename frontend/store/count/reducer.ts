import {AnyAction} from 'redux';
import {HYDRATE} from 'next-redux-wrapper';
import {client} from '../../lib/apollo';
import { countActionTypes } from './action';
export interface State {
    app: string;
    page: string;
    users: any
}

const reducer = (state: State = {app: 'init', page: 'init', users: {}}, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            if (action.payload.app === 'init') delete action.payload.app;
            if (action.payload.page === 'init') delete action.payload.page;
            return {...state, ...action.payload};
        case 'APP':
            return {...state, app: action.payload};
        case 'PAGE':
            return {...state, page: action.payload};
        case 'GET_USERS':
            return {...state, users: action.payload};
        default:
            return state;
    }
};

export default reducer;



// const countInitialState = {
//   count: 0,
//   users: []
// }


// export default function reducer(state = countInitialState, action){
// //  console.log(action);
//   switch (action.type){

//     case countActionTypes.ADD:
//       return Object.assign({}, state, {
//         count: state.count+1
//       })
//     case countActionTypes.ADD_POST:
//       return Object.assign({}, state, {
//         posts: action.posts
//       })
//     case countActionTypes.SET_USERS:
//      // console.log("look at me", action.payload);
//       return Object.assign({}, state, {
//         users: action.payload
//       })
//     case countActionTypes.GET_USERS:
//       //console.log("KLLLLLLLLLLLLLLLL", action.payload);
//       // return {
//       //   ...state,
//       //   users: [action.payload, ...state.users]
//       // };
//       console.log("can you see me?", action.payload);
//       return Object.assign({}, state, {
//         users: action.payload
//       })

//     default:
//         return state;
//   }
// }