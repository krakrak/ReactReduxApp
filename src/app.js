"use strict"
import {createStore} from 'redux';

// Step 3 define reducers
const reducer = function (state={}, action){
    switch (action.type){
        case "POST_BOOK":
        return state = action.payload
        break;
    }
    return state
}
// Step 1 create the store
const store = createStore(reducer);

store.subscribe(function(){
    console.log('current state is: ',  store.getState());
    console.log('current price is: ',  store.getState().price);
})

// Step 2 create and dispatch actions
store.dispatch({type:"POST_BOOK", payload : {
    id : 1,
    title :'book 1',
    description : 'This is book 1',
    price : "2EUR"
    }
})
