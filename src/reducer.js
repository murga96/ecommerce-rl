export const initialState = {
    basket: {},
    user: null,
    token: {},
}

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    SET_BASKET: "SET_BASKET",
    SET_TOKEN: "SET_TOKEN",
    REMOVE_ITEM_FROM_BASKET: "REMOVE_ITEM_FROM_BASKET",
    SET_USER: "SET_USER",
    EMPTY_BASKET: "EMPTY_BASKET",
}

export const getBasketTotal = (basket) => {
    return basket?.reduce((ammount, item) => ammount + item.price, 0)
}

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token,
            }
        case "SET_BASKET":
            return {
                ...state,
                basket: action.basket,
            }
        case "REMOVE_ITEM_FROM_BASKET":
            const index = state.basket.findIndex((item => item.id === action.id))
            let newBasket = [...state.basket]
            console.log(index)
            console.log(action.id)
            if( index >= 0 ){
                newBasket.splice(index, 1)
            }else {console.log("Cant remove product")}
            return {
                ...state,
                basket: newBasket,
            }
        case "SET_USER":  
        return {
                ...state,
                user: action.user
            }
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: action.basket
            }
        default:
            return state;
    }
}

export default reducer;