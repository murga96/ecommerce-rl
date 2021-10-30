export const initialState = {
    basket: null,
    user: null,
    token: {},
}

export const actionTypes = {
    SET_BASKET: "SET_BASKET",
    SET_TOKEN: "SET_TOKEN",
    SET_USER: "SET_USER",
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
    }
}

export default reducer;