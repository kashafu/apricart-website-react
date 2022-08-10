import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { getGeneralApiParams } from "../helpers/ApiHelpers";

let { selectedAddress, selectedType, city } = getGeneralApiParams()

const cookie = new Cookies()

const generalSlice = createSlice({
	name: "general",
	initialState: {
		selectedAddress: selectedAddress,
		ticker: '',
		nearestWarehouse: '',
		selectedType: selectedType,
		city: city
	},
	reducers: {
		updateSelectedAddress: (state, action) => {
			state.selectedAddress = { ...action.payload }
		},
		updateTicker: (state, action) => {
			state.ticker = action.payload
		},
		updateCity: (state, action) => {
			state.city = action.payload
		},
		updateSelectedType: (state, action) => {
			state.selectedType = action.payload
			cookie.remove('selected-type', { path: '/' })
			cookie.set('selected-type', action.payload, { path: '/' })
		},
	}
})

export const generalReducer = generalSlice.reducer

export const {
	updateSelectedAddress,
	updateTicker,
	updateSelectedType,
	updateCity
} = generalSlice.actions