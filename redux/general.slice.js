import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { getGeneralApiParams } from "../helpers/ApiHelpers";

let { selectedAddress } = getGeneralApiParams()

const generalSlice = createSlice({
	name: "general",
	initialState: { 
		selectedAddress: selectedAddress,
		ticker: '',
		nearestWarehouse: ''
	},
	reducers: {
		updateSelectedAddress: (state, action) => {
			state.selectedAddress = {...action.payload}
		},
		updateticker: (state, action) => {
			state.ticker = {...action.payload}
		}
	}
})


export const generalReducer = generalSlice.reducer

export const {
	updateSelectedAddress,
	updateticker
} = generalSlice.actions