"use strict"

// CART REDUCERS
export function cartReducers(state={cart: []}, action) {
    switch(action.type){
        case "GET_CART":
        return {...state,
            cart:action.payload,
            totalAmount:totals(action.payload).amount,
            totalQuantity:totals(action.payload).quantity
        }
        case "ADD_TO_CART":
        return {...state, 
            cart:action.payload,
            totalAmount: totals(action.payload).amount,
            totalQuantity: totals(action.payload).quantity
        }
        break;
        case "UPDATE_CART":
        // //Create a copy of the current array of books
        // const currentBookToUpdate = [...state.cart]
        // // Determine at which index in the book array is the book to be updated
        // const indexToUpdate = currentBookToUpdate.findIndex(
        //     function(book) {
        //         return book._id === action._id;
        //     }
        // )
        // const newBookToUpdate = {
        //     ...currentBookToUpdate[indexToUpdate],
        //     quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
        // }

        // let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
        // ...currentBookToUpdate.slice(indexToUpdate+1)]

        return {...state, 
            cart:action.payload,
            totalAmount: totals(action.payload).amount,
            totalQuantity: totals(action.payload).quantity
        }
        break;

        case "DELETE_CART_ITEM":
        return {...state, 
            cart:action.payload,
            totalAmount:totals(action.payload).amount,
            totalQuantity: totals(action.payload).quantity
        }
        break;
    }

    return state
}

//Calculate totals

export function totals(payloadArray) {
    const totalAmount = payloadArray.map(function(cartArray){
        return cartArray.price * cartArray.quantity;
    }).reduce(function(a,b){
        return a + b;
    }, 0); // Start summing from index 0

    const totalQuantity = payloadArray.map(function(quantity){
        return quantity.quantity;
    }).reduce(function(a,b){
        return a + b;
    }, 0);

    return {amount:totalAmount.toFixed(2), quantity:totalQuantity}
}