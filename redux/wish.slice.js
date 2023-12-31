import { createSlice } from "@reduxjs/toolkit"
import { getCookie } from "../helpers/Cookies"

const wishSlice = createSlice({
	name: "wish",
	initialState: [],
	reducers: {
		addToWish: (state, action) => {
			const wishExit = state.find((item) => item.id === action.payload.id)
			if (wishExit) {
				wishExit.quantity++
			} else {
				state.push({ ...action.payload, quantity: 1 })
			}
		},
		incrementwishQuantity: (state, action) => {
			const item = state.find((item) => item.id === action.payload)
			item.quantity++
		},
		updatedwish: (state, action) => {
			let userId = getCookie("cookies-userId")
			state.push({ ...action.payload, quantity: 1 })
		},
		Initilaize(state, action) {
			state.splice(0, state.length)
		},
		decrementwishQuantity: (state, action) => {
			const item = state.find((item) => item.id === action.payload)
			if (item.quantity === 1) {
				const index = state.findIndex(
					(item) => item.id === action.payload
				)
				state.splice(index, 1)
			} else {
				item.quantity--
			}
		},
		removeFromWish: (state, action) => {
			const index = state.findIndex((item) => item.id === action.payload)
			state.splice(index, 1)
		},
	},
})

export const wishReducer = wishSlice.reducer

export const {
	addToWish,
	incrementQuantity,
	decrementQuantity,
	removeFromWish,
	updatedwish,
	Initilaize,
} = wishSlice.actions
