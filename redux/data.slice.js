import { createSlice } from "@reduxjs/toolkit"

const dataSlice = createSlice({
	name: "data",
	initialState: {
		categories: [],
	},
	reducers: {
		updateCategories: (state, action) => {
			state.categories = action.payload
		},
	},
})

export const dataReducer = dataSlice.reducer

export const {
	updateCategories
} = dataSlice.actions
