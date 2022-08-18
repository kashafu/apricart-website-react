import { configureStore } from "@reduxjs/toolkit"
import { cartReducer } from "./cart.slice"
import { wishReducer } from "./wish.slice"
import { generalReducer } from "./general.slice"
import { dataReducer } from "./data.slice"
import { pageReducer } from "./page.slice"
const reducer = {
	cart: cartReducer,
	wish: wishReducer,
	general: generalReducer,
	data: dataReducer,
	page: pageReducer
}

const store = configureStore({
	reducer,
})

export default store
