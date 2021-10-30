export const initialState = {
    basket: null,
    user: null,
    token: {},
    orderNumber: null,
}

export const actionTypes = {
    SET_BASKET: "SET_BASKET",
    SET_TOKEN: "SET_TOKEN",
    SET_USER: "SET_USER",
    SET_ORDER_NUMBER: "SET_ORDER_NUMBER",
}

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
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
        case "SET_USER":  
        return {
                ...state,
                user: action.user
            }
        case "SET_ORDER_NUMBER":  
            return {
                ...state,
                orderNumber: action.orderNumber
            }
    }
}

export default reducer;