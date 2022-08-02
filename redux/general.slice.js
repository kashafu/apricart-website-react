import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGeneralApiParams } from "../helpers/ApiHelpers";

let { selectedAddress, selectedType } = getGeneralApiParams()

const generalSlice = createSlice({
	name: "general",
	initialState: { 
		selectedAddress: selectedAddress,
		ticker: '',
		nearestWarehouse: '',
		selectedType: selectedType
	},
	reducers: {
		updateSelectedAddress: (state, action) => {
			state.selectedAddress = {...action.payload}
		},
		updateTicker: (state, action) => {
			state.ticker = action.payload
		},
		updateSelectedType: (state, action) => {
			state.selectedType = action.payload
		},
	}
})

export const generalReducer = generalSlice.reducer

export const {
	updateSelectedAddress,
	updateTicker,
	updateSelectedType
} = generalSlice.actions