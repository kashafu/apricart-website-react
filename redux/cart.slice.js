import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addToCart: (state, action) => {
			const itemExists = state.find((item) => item.sku === action.payload.sku);
			let qty = action.payload.qty;
			if (itemExists) {
				itemExists.quantity++;
				itemExists.qty = action.payload.qty
			} else {
				state.push({ ...action.payload, quantity: qty });
			}
		},
		incrementQuantity: (state, action) => {
			const item = state.find((item) => item.sku === action.payload);
			if (item.qty < item.maxQty) {
				item.qty++;
			} else {
				toast.info("Limit Exceeded !");
			}
		},
		decrementQuantity: (state, action) => {
			const item = state.find((item) => item.sku === action.payload);
			if (item.qty === item.minQty) {
				return
			} else {
				item.qty--;
			}
		},
		updateQuantity: (state, action) => {
			const item = state.find((item) => item.sku === action.payload.sku);

			// Increment qty case
			if (action.payload.newQty > item?.qty) {
				if (item?.qty < item?.maxQty) {
					item.qty++;
				}
			}
			// Decrement qty case
			else {
				if (item.qty === item.minQty) {
					return
				} else {
					item.qty--;
				}
			}
		},
		initialize: (state, action) => {
			state.splice(0, state.length)
			action.payload.forEach((item) => {
				state.push(item)
			})
		},
		removeFromCart: (state, action) => {
			const index = state.findIndex((item) => item.sku === action.payload);
			state.splice(index, 1);
		}
	},
});


export const cartReducer = cartSlice.reducer;

export const {
	addToCart,
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
	initialize,
	updateQuantity
} = cartSlice.actions;
