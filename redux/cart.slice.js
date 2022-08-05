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
			console.log(action.payload);
			const itemExists = state.find((item) => item.id === action.payload.id);
            let qty = action.payload.qty;
			if (itemExists) {
				itemExists.quantity++;
				itemExists.qty = action.payload.qty
			} else {
				console.log(qty);
				state.push({ ...action.payload, quantity: qty });
			}
			cookies.remove('cart-item', {path: '/'})
			cookies.set('cart-item', JSON.stringify(...state), {path: '/'})
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
				// const index = state.findIndex((item) => item.id === action.payload);
				// state.splice(index, 1);
				return
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
