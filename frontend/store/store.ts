import {createStore, applyMiddleware, combineReducers} from 'redux';
//import logger from 'redux-logger';
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import rootReducer from '../store/count/reducers';
import {State} from '../store/count/reducers/countReducer';
import thunkMiddleware from 'redux-thunk'

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
  }


const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    //if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

export const makeStore: MakeStore<State> = (context: Context) => {
    const store = createStore(reducer, bindMiddleware([thunkMiddleware]));

    // if (module.hot) {
    //     module.hot.accept('./reducer', () => {
    //         console.log('Replacing reducer');
    //         store.replaceReducer(require('./reducer').default);
    //     });
    // }
    return store;
};

export const wrapper = createWrapper<State>(makeStore, {debug: true});


