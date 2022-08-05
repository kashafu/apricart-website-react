import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { getGeneralApiParams } from "../helpers/ApiHelpers";

let { selectedAddress, selectedType } = getGeneralApiParams()

const cookie = new Cookies()

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
			cookie.remove('selected-type', {path: '/'})
			cookie.set('selected-type', action.payload, {path: '/'})
		},
	}
})

export const generalReducer = generalSlice.reducer

export const {
	updateSelectedAddress,
	updateTicker,
	updateSelectedType
} = generalSlice.actions