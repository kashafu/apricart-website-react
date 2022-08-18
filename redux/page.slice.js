import { createSlice } from "@reduxjs/toolkit"

const pageSlice = createSlice({
	name: "page",
	initialState: {
		cartIconPosition: {},
	},
	reducers: {
		updateCartIconPosition: (state, action) => {
			state.cartIconPosition = action.payload
		},
	},
})

export const pageReducer = pageSlice.reducer

export const {
	updateCartIconPosition
} = pageSlice.actions
