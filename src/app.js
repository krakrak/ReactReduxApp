"use strict"
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';
//IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

// Step 1 create the store
const middleware = applyMiddleware(logger)
const store = createStore(reducers, middleware);

// store.subscribe(function(){
//     console.log('current state is: ',  store.getState());
//     //console.log('current price is: ',  store.getState()[1].price);
// })

// Step 2 create and dispatch actions
// Post books
store.dispatch(postBooks(
    [   {
            id : 1,
            title :'book 1',
            description : 'This is book 1',
            price : "2EUR"
        },
        {
            id : 2,
            title :'book 2',
            description : 'This is book 2',
            price : "4EUR"
        },
        {
            id : 3,
            title :'book 3',
            description : 'This is book 3',
            price : "10EUR"
        },
        {
            id : 4,
            title :'book 4',
            description : 'This is book 4',
            price : "100EUR"
        }
    ]
))

//Delete a book
store.dispatch(deleteBooks(
    {id : 1}
))

//Update a book
store.dispatch(updateBooks(
    {
        id : 4,
        title:'Le Japonais d\'Afrique'
    }
))

 //-->> CART ACTIONS

 //Add to cart
 store.dispatch(addToCart([{id: 1}]))
// store.dispatch({
//     type:"ADD_TO_CART",
//     payload :[{id : 2}]
// })