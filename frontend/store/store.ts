import {createStore, applyMiddleware} from 'redux';
//import logger from 'redux-logger';
import {MakeStore, createWrapper, Context} from 'next-redux-wrapper';
import reducer, {State} from './count/reducer';


const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
  }

export const makeStore: MakeStore<State> = (context: Context) => {
    const store = createStore(reducer, bindMiddleware([]));

    // if (module.hot) {
    //     module.hot.accept('./reducer', () => {
    //         console.log('Replacing reducer');
    //         store.replaceReducer(require('./reducer').default);
    //     });
    // }

    return store;
};

export const wrapper = createWrapper<State>(makeStore, {debug: true});


// import { HYDRATE, createWrapper } from 'next-redux-wrapper'
// import { applyMiddleware, combineReducers, createStore } from 'redux'

// import { client } from '../lib/apollo';
// import count from './count/reducer'
// import thunkMiddleware from 'redux-thunk'

// const bindMiddleware = (middleware) => {
//   if (process.env.NODE_ENV !== 'production') {
//     const { composeWithDevTools } = require('redux-devtools-extension')
//     return composeWithDevTools(applyMiddleware(...middleware))
//   }
//   return applyMiddleware(...middleware)
// }

// const combinedReducer = combineReducers({
//   count,
// })

// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     }
//     if (state.count) nextState.count = state.count // preserve count value on client side navigation
//     return nextState
//   } else {
//     return combinedReducer(state, action)
//   }
// }

// const initStore = () => {
//   return createStore(reducer, bindMiddleware([thunkMiddleware.withExtraArgument(client)]))
// }

// export const wrapper = createWrapper(initStore)
