import { ADD_TO_CART, REMOVE_TO_CART } from "../actions/cartActions";
import { cartItems } from "../initialValues/cartItems";

const initialState = {
    cartItems: cartItems
}

export default function cartReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_TO_CART:
            let product = state.cartItems.find(c => c.product.id === payload.id)
            if (product) {
                product.quantity++;
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { quantity: 1, product: payload }]
                }
            }
        case REMOVE_TO_CART:
            let removeProduct = state.cartItems.filter(c => c.product.id === payload.id)
            if (removeProduct && removeProduct.quantity > 1) {
                removeProduct.quantity--;
                return {
                    ...state
                }
            } else if (removeProduct.quantity === 1) {
                return {
                    ...state,
                    cartItems: state.cartItems.filter(c => c.product.id !== payload.id)
                }
            }
        // return {
        //     ...state,
        //     cartItems: state.cartItems.filter(c => c.product.id !== payload.id)
        // }
        default:
            return state
    }
}