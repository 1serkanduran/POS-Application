import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        total:0,
        price:0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.cartItems.push(action.payload)
        },
        removeItem: (state, action) => {
            state.items.pop()
        },
    },
})


export const {addProduct, removeItem} = cartSlice.actions;
export default cartSlice.reducer