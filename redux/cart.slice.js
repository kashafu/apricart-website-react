import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addToCart: (state, action) => {
			const itemExists = state.find((item) => item.id === action.payload.id);
			let qty = action.payload.qty;
			if (itemExists) {
				itemExists.quantity++;
				itemExists.qty = action.payload.qty
			} else {
				state.push({ ...action.payload, quantity: qty });
			}
		},
		updatedcart: (state, action) => {
			let qty = action.payload.qty;
			state.push({ ...action.payload, quantity: qty });
		},
		incrementQuantity: (state, action) => {
			const item = state.find((item) => item.id === action.payload);
			if (item.qty < item.maxQty) {
				item.qty++;
			} else {
				item.qty;
				toast.info("Limit Exceeded !");
			}
		},
		decrementQuantity: (state, action) => {
			const item = state.find((item) => item.id === action.payload);
			if (item.qty === item.minQty) {
				return
			} else {
				item.qty--;
			}
		},
		initialize: (state, action) => {
			state.splice(0, state.length)
			action.payload.forEach((item) => {
				state.push(item)
			})
		},
		removeFromCart: (state, action) => {
			const index = state.findIndex((item) => item.id === action.payload);
			state.splice(index, 1);
			toast.info("Item Removed !");
		},
		getCartTotal: (state, action) => {
			let total = 0
			state.forEach((item) => {
				total += item.currentPrice
			})
			return total
		},
		getItemQtyInCart: (state, action) => {
			let qty = 0
			const itemIndex = state.findIndex((item) => item.id === action.payload.id)
			if (itemIndex != -1) {
				qty = state[itemIndex].qty
				console.log(qty)
				// return qty
			}
		}
	},
});


export const cartReducer = cartSlice.reducer;

export const {
	addToCart,
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
	updatedcart,
	initialize,
	getCartTotal,
	getItemQtyInCart
} = cartSlice.actions;
