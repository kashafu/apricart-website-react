import { createSlice } from "@reduxjs/toolkit"

const pageSlice = createSlice({
	name: "page",
	initialState: {
		cartIconRef: {},
	},
	reducers: {
		setCartIconRef: (state, action) => {
			state.cartIconRef = action.payload
		},
	},
})

export const pageReducer = pageSlice.reducer

export const {
	setCartIconRef
} = pageSlice.actions
