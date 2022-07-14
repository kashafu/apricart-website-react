import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addToCart: (state, action) => {
			console.log(action);
			const itemExists = state.find((item) => item.id === action.payload.id);

			if (itemExists) {
				itemExists.quantity++;
			} else {
				state.push({ ...action.payload, quantity: 1 });
			}
			cookies.set('cart-item', JSON.stringify(...state))
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
			if (item.qty === 1) {
				const index = state.findIndex((item) => item.id === action.payload);
				state.splice(index, 1);
			} else {
				item.qty--;
			}
		},
		initialize: (state, action) => {
			// state.push({ undefined, action })
			state.splice(0, state.length)
			action.payload.forEach((item)=>{
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
		  state.forEach((item)=>{
		    total += item.currentPrice
		  })
		  return total
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
	getCartTotal
} = cartSlice.actions;
