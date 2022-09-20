import { createSlice } from "@reduxjs/toolkit"
import { setCookie } from "../helpers/Cookies"
import { setItemSessionStorage, setItemLocalStorage, removeItemLocalStorage } from "../helpers/Storage"
import { getGeneralApiParams } from "../helpers/ApiHelpers"

let { selectedAddress, selectedType, city, selectedPickupLocation, redirectSource } = getGeneralApiParams()

const generalSlice = createSlice({
	name: "general",
	initialState: {
		selectedAddress: selectedAddress,
		ticker: "",
		nearestWarehouse: "",
		selectedType: selectedType,
		city: city,
		isUserInitialized: false,
		pickupLocation: selectedPickupLocation,
		redirectSource: redirectSource
	},
	reducers: {
		updateSelectedAddress: (state, action) => {
			state.selectedAddress = { ...action.payload }
			setItemLocalStorage('selected-address', JSON.stringify(action.payload))
		},
		removeSelectedAddress: (state, action) => {
			state.selectedAddress = {}
			removeItemLocalStorage('selected-address')
		},
		updateTicker: (state, action) => {
			state.ticker = action.payload
		},
		updateCity: (state, action) => {
			state.city = action.payload
			setItemLocalStorage("cities", action.payload)
		},
		updatePickupLocation: (state, action) => {
			state.pickupLocation = action.payload
			setItemSessionStorage("selected-pickup-location", JSON.stringify(action.payload))
		},
		updateSelectedType: (state, action) => {
			state.selectedType = action.payload
			setItemLocalStorage("selected-type", action.payload)
		},
		updateRedirectSource: (state, action) => {
			state.redirectSource = action.payload
			setItemSessionStorage("redirect-source", action.payload)
		}
	},
})

export const generalReducer = generalSlice.reducer

export const {
	updateSelectedAddress,
	updateTicker,
	updateSelectedType,
	updateCity,
	updatePickupLocation,
	updateRedirectSource,
	removeSelectedAddress
} = generalSlice.actions
