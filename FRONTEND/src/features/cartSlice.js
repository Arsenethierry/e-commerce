import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    cartError: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info("Increased Product Quantity",{
                    position: 'bottom-center'
                })
            }else {
                const tempProd = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tempProd);
                toast.success(`${action.payload.title} added to cart`, {
                    position: 'bottom-center'
                })
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if(itemIndex >= 0) {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)
            }else {
                state.cartError = 'Item not found'
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        decreaseQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            if(itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.info("Decreased Product Quantity",{
                    position: 'bottom-center'
                })
            } else {
                state.cartError = 'Item not found'
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        getTotals(state, action) {
            let { totalPrice, totalQuantity } = state.cartItems.reduce((cartTotal, cartItem)=> {
                const { price, cartQuantity } = cartItem;
                const itemSubTotalPrice = price * cartQuantity
                
                cartTotal.totalPrice += itemSubTotalPrice;
                cartTotal.totalQuantity += cartQuantity;
                return cartTotal;
            },{
                totalPrice: 0,
                totalQuantity: 0
            });
            state.cartTotalAmount = totalPrice
            state.cartTotalQuantity = totalQuantity
        }
    },
});

export const { addToCart, removeFromCart, decreaseQuantity, getTotals } = cartSlice.actions;

export default cartSlice.reducer;