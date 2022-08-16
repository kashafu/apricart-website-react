import { createSlice } from "@reduxjs/toolkit"
import { setCookie } from "../helpers/Cookies"
import { getGeneralApiParams } from "../helpers/ApiHelpers"

let { selectedAddress, selectedType, city } = getGeneralApiParams()

const generalSlice = createSlice({
	name: "general",
	initialState: {
		selectedAddress: selectedAddress,
		ticker: "",
		nearestWarehouse: "",
		selectedType: selectedType,
		city: city,
		isUserInitialized: false,
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
			setCookie("selected-type", action.payload)
		},
		updateIsUserInitialized: (state, action) => {
			state.isUserInitialized = action.payload
		},
	},
})

export const generalReducer = generalSlice.reducer

export const {
	updateSelectedAddress,
	updateTicker,
	updateSelectedType,
	updateCity,
	updateIsUserInitialized,
} = generalSlice.actions
