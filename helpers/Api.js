import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { base_url_api } from "../information.json"
import { getGeneralApiParams } from "./ApiHelpers"
import { useRouter } from "next/router"
import {
	addToCart,
	decrementQuantity,
	incrementQuantity,
	initialize,
	removeFromCart,
	updateQuantity,
} from "../redux/cart.slice"
import { updateTicker } from "../redux/general.slice"
import { toast } from "react-toastify"
import { setCookie } from "./Cookies"
import { updateCategories } from "../redux/data.slice"

const fullUrl = (url) => {
	let { city, userId, clientType, orderType, prodType } =
		getGeneralApiParams()

	return (
		base_url_api +
		url +
		"&city=" +
		city +
		"&userid=" +
		userId +
		"&client_type=" +
		clientType +
		"&prod_type=" +
		prodType +
		"&order_type=" +
		orderType +
		"&lang=en"
	)
}

const initializeUserApi = async () => {
	let { isUserInitialized, latitude, longitude, headers } =
		getGeneralApiParams()

	if (!isUserInitialized) {
		let url =
			"/home/all?client_lat=" +
			latitude +
			"&client_long=" +
			longitude +
			"&web=false&hide=true"

		try {
			await axios.get(fullUrl(url), {
				headers: headers,
			})
			setCookie("user-initialized", true)
		} catch (error) {
			console.log(error?.response)
		}
	}
}

export const useCategoriesApi = () => {
	const selectedTypeSelector = useSelector(
		(state) => state.general.selectedType
	)
	const citySelector = useSelector((state) => state.general.city)
	const [isLoading, setIsLoading] = useState(true)
	const [categories, setCategories] = useState(null)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		callApi()
	}, [selectedTypeSelector, citySelector])

	const callApi = async () => {
		setIsLoading(true)
		await initializeUserApi()
		let { headers } = getGeneralApiParams()
		let url = "/catalog/categories?level=all"

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setResponse(apiResponse)
			setCategories(apiResponse.data.data)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, categories, errorMessage, response, errorResponse }
}

export const useCategoryProductsApi = () => {
	const router = useRouter()
	const { categoryId, categoryName } = router.query

	const [isLoading, setIsLoading] = useState(true)
	const [categoryProducts, setCategoryProducts] = useState(null)
	const [size, setSize] = useState(20)
	const [page, setPage] = useState(1)
	const [totalItems, setTotalItems] = useState(0)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		if (router.isReady) {
			callApi()
		}
	}, [router.query, page])

	const callApi = async () => {
		setIsLoading(true)
		await initializeUserApi()
		let { headers } = getGeneralApiParams()
		let url =
			"/catalog/categories/products?category=" +
			categoryId +
			"&page=" +
			page +
			"&size=" +
			size +
			"&sortType=&sortDirection=desc&instant=3"

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setResponse(apiResponse)
			setCategoryProducts(apiResponse.data.data)
			setTotalItems(+apiResponse.data.total)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		categoryProducts,
		errorMessage,
		response,
		errorResponse,
		setSize,
		setPage,
		page,
		size,
		totalItems,
	}
}

export const useSubCategoriesApi = () => {
	const router = useRouter()
	const { categoryId, categoryName } = router.query

	const [isLoading, setIsLoading] = useState(true)
	const [subCategories, setSubCategories] = useState(null)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		if (router.isReady) {
			callApi()
		}
	}, [router.query])

	const callApi = async () => {
		setIsLoading(true)
		await initializeUserApi()
		let { headers } = getGeneralApiParams()
		let url = "/catalog/categories/detail?id=" + categoryId

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setResponse(apiResponse)
			setSubCategories(apiResponse.data.data)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, subCategories, errorMessage, response, errorResponse }
}

export const useHomeApi = () => {
	const dispatch = useDispatch()
	const selectedTypeSelector = useSelector(
		(state) => state.general.selectedType
	)
	const citySelector = useSelector((state) => state.general.city)
	const selectedAddressSelector = useSelector((state) => state.general.selectedAddress)
	const selectedPickupLocationSelector = useSelector((state) => state.general.pickupLocation)
	const [isLoading, setIsLoading] = useState(true)
	const [homeData, setHomeData] = useState(null)
	const [categories, setCategories] = useState(null)
	const [banners, setBanners] = useState(null)
	const [ticker, setTicker] = useState("")
	const [isPopupAd, setIsPopupAd] = useState(false)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		callApi()
	}, [selectedTypeSelector, citySelector, selectedAddressSelector, selectedPickupLocationSelector])

	const callApi = async () => {
		setIsLoading(true)
		let { latitude, longitude, headers } = getGeneralApiParams()

		let url =
			"/home/all?client_lat=" +
			latitude +
			"&client_long=" +
			longitude +
			"&web=true"

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setResponse(apiResponse)
			setHomeData(apiResponse.data.data)
			setCategories(apiResponse.data.data.categories)
			dispatch(updateCategories(apiResponse.data.data.categories))
			setBanners(apiResponse.data.data.banners)
			setTicker(apiResponse.data.data.ticker)
			dispatch(updateTicker(apiResponse.data.data.ticker))
			setIsPopupAd(apiResponse.data.data.dialog)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		homeData,
		errorMessage,
		response,
		errorResponse,
		isPopupAd,
		categories,
		banners,
		ticker,
	}
}

export const usePickupLocationsApi = () => {
	const citySelector = useSelector((state) => state.general.city)
	const [isLoading, setIsLoading] = useState(true)
	const [pickupLocations, setPickupLocations] = useState(null)
	const [availableDates, setAvailableDates] = useState(null)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		callApi()
	}, [citySelector])

	const callApi = async () => {
		setIsLoading(true)
		await initializeUserApi()
		let { headers } = getGeneralApiParams()

		let url = "/order/address/pickup?"

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setPickupLocations(apiResponse.data.data.pickLocationDtoList)
			setAvailableDates(apiResponse.data.data.availableDates)
			setResponse(apiResponse)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		pickupLocations,
		availableDates,
		errorMessage,
		response,
		errorResponse
	}
}

export const useProductDetailsApi = () => {
	const router = useRouter()
	const { productId, productName } = router.query

	const [isLoading, setIsLoading] = useState(true)
	const [productData, setProductData] = useState(null)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		if (router.isReady) {
			callApi()
		}
	}, [router.query])

	const callApi = async () => {
		setIsLoading(true)
		await initializeUserApi()
		let { headers } = getGeneralApiParams()

		let url = "/catalog/products/detail?id=" + productId

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setResponse(apiResponse)
			setProductData(apiResponse.data.data)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		productData,
		errorMessage,
		response,
		errorResponse,
	}
}

export const useAddToCartApi = (sku, qty, product) => {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isPlaceOrder, setIsPlaceOrder] = useState(false)

	let { headers, token, userId } = getGeneralApiParams()
	let body
	let url

	useEffect(() => {
		if (isPlaceOrder) {
			callApi()
		}
	}, [isPlaceOrder])

	const callApi = async () => {
		if (token) {
			body = {
				cart: [
					{
						sku,
						qty,
					},
				],
			}
			url = "/order/cart/save?"
		} else {
			body = {
				userId,
				cart: [
					{
						sku,
						qty,
					},
				],
			}
			url = "/guest/cart/save?"
		}

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setResponse(apiResponse)

			let reduxCartData = {
				...product,
			}
			reduxCartData.qty = qty
			dispatch(addToCart(reduxCartData))
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			toast.error(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsPlaceOrder(false)
		}
	}

	return {
		isLoading,
		errorMessage,
		response,
		errorResponse,
		setIsPlaceOrder,
	}
}

export const useOptionsApi = () => {
	const selectedTypeSelector = useSelector(
		(state) => state.general.selectedType
	)
	const [isLoading, setIsLoading] = useState(true)
	const [optionsData, setOptionsData] = useState(null)
	const [shipmentChargedAt, setShipmentChargedAt] = useState(0)
	const [shipmentFixAmount, setShipmentFixAmount] = useState(0)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		callApi()
	}, [selectedTypeSelector])

	const callApi = async () => {
		setIsLoading(true)
		await initializeUserApi()
		let { headers } = getGeneralApiParams()

		let url = "/options/all?"

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setResponse(apiResponse)
			setOptionsData(apiResponse.data.data)
			apiResponse.data.data.forEach((item) => {
				if (item.key === "shippment_charged_at") {
					setShipmentChargedAt(item.value)
				}
				if (item.key === "shippment_fix_amount") {
					setShipmentFixAmount(item.value)
				}
			})
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		optionsData,
		errorMessage,
		response,
		errorResponse,
		shipmentChargedAt,
		shipmentFixAmount,
	}
}

export const usePaymentMethodsApi = () => {
	const selectedTypeSelector = useSelector(
		(state) => state.general.selectedType
	)
	const [isLoading, setIsLoading] = useState(true)
	const [paymentMethodsData, setPaymentMethodsData] = useState(null)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		callApi()
	}, [selectedTypeSelector])

	const callApi = async () => {
		setIsLoading(true)
		await initializeUserApi()
		let { headers } = getGeneralApiParams()

		let url = "/order/payment/info?"

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setResponse(apiResponse)
			setPaymentMethodsData(apiResponse.data.data)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		paymentMethodsData,
		errorMessage,
		response,
		errorResponse,
	}
}

// export const useCheckoutApi = (checkoutData, checkoutAddress) => {
// 	const [isLoading, setIsLoading] = useState(true)
// 	const [response, setResponse] = useState(null)
// 	const [errorResponse, setErrorResponse] = useState(null)
// 	const [errorMessage, setErrorMessage] = useState("")
// 	const [isCheckout, setIsCheckout] = useState(false)

// 	let { headers, clientType, prodType, orderType } = getGeneralApiParams()
// 	let lat = 0
// 	let long = 0
// 	let addressId = 0
// 	if (typeof checkoutAddress === "object") {
// 		lat = checkoutAddress ? checkoutAddress.mapLat : "0"
// 		long = checkoutAddress ? checkoutAddress.mapLong : "0"
// 		addressId = checkoutAddress ? checkoutAddress.id : ""
// 	} else {
// 		lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : "0"
// 		long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : "0"
// 		addressId = checkoutAddress ? JSON.parse(checkoutAddress).id : ""
// 	}
// 	let body = {
// 		...checkoutData,
// 		address: addressId,
// 		showProducts: true,
// 		verify: false,
// 		prodType: prodType,
// 		day: "",
// 		startTime: "",
// 		endTime: "",
// 		clientType: clientType,
// 		orderType: orderType,
// 	}
// 	let url = "/order/cart/checkout?client_lat=" + lat + "&client_long=" + long

// 	useEffect(() => {
// 		if (isCheckout) {
// 			callApi()
// 		}
// 	}, [isCheckout])

// 	const callApi = async () => {
// 		setIsLoading(true)
// 		toast.info("Processing Order")
// 		try {
// 			let apiResponse = await axios.post(fullUrl(url), body, {
// 				headers: headers,
// 			})
// 			setResponse(apiResponse)
// 			if (checkoutData.paymentMethod === "meezan") {
// 				let { paymentUrl } = response.data.data
// 				window.open(paymentUrl, "_blank").focus()
// 			}
// 		} catch (error) {
// 			setErrorResponse(error?.response)
// 			setErrorMessage(error?.response?.data?.message)
// 			toast.error(error?.response?.data?.message)
// 		} finally {
// 			setIsLoading(false)
// 			setIsCheckout(false)
// 		}
// 	}

// 	return {
// 		isLoading,
// 		errorMessage,
// 		response,
// 		errorResponse,
// 		setIsCheckout,
// 	}
// }

export const useUpdateItemQtyApi = () => {
	const dispatch = useDispatch()
	const [data, setData] = useState({
		sku: "",
		qty: 0,
	})
	const [isLoading, setIsLoading] = useState(true)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isUpdateItemQty, setIsUpdateItemQty] = useState(false)

	let { headers, token, userId } = getGeneralApiParams()
	let body
	let url

	useEffect(() => {
		if (isUpdateItemQty) {
			callApi()
			console.log("CALLED")
		}
	}, [isUpdateItemQty])

	const callApi = async () => {
		if (token) {
			body = {
				cart: [
					{
						sku: data.sku,
						qty: data.qty,
					},
				],
			}
			url = "/order/cart/updateqty?"
		} else {
			body = {
				userId,
				cart: [
					{
						sku: data.sku,
						qty: data.qty,
					},
				],
			}
			url = "/guest/cart/updateqty?"
		}

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setResponse(apiResponse)
			dispatch(
				updateQuantity({
					sku: data.sku,
					newQty: data.qty,
				})
			)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			toast.error(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsUpdateItemQty(false)
		}
	}

	return {
		isLoading,
		errorMessage,
		response,
		errorResponse,
		setIsUpdateItemQty,
		setData,
	}
}

export const useDeleteItemApi = () => {
	const dispatch = useDispatch()
	const [sku, setSku] = useState("")
	const [isLoading, setIsLoading] = useState(true)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isDelete, setIsDelete] = useState(false)

	useEffect(() => {
		if (isDelete) {
			callApi()
		}
	}, [isDelete])

	const callApi = async () => {
		setIsLoading(true)

		let { headers, token, userId } = getGeneralApiParams()
		let url
		let body

		if (token) {
			url = "/order/cart/delete?"
			body = {
				cart: [
					{
						sku: sku,
					},
				],
			}
		} else {
			url = "/guest/cart/delete?"
			body = {
				userId,
				cart: [
					{
						sku: sku,
					},
				],
			}
		}

		try {
			let apiResponse = await axios.delete(fullUrl(url), {
				headers: headers,
				data: body,
			})
			setResponse(apiResponse)
			dispatch(removeFromCart(sku))
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			toast.error(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsDelete(false)
		}
	}

	return {
		isLoading,
		errorMessage,
		response,
		errorResponse,
		setIsDelete,
		setSku,
	}
}

export const useInitialCartDataApi = () => {
	const dispatch = useDispatch()
	const selectedTypeSelector = useSelector(
		(state) => state.general.selectedType
	)
	const citySelector = useSelector((state) => state.general.city)
	const selectedAddressSelector = useSelector((state) => state.general.selectedAddress)
	const selectedPickupLocationSelector = useSelector((state) => state.general.pickupLocation)
	let { token } = getGeneralApiParams()
	const [coupon, setCoupon] = useState('')
	const [couponMessage, setCouponMessage] = useState('')
	const [notes, setNotes] = useState('')
	const [paymentMethod, setPaymentMethod] = useState('cash')
	const [paymentMethods, setPaymentMethods] = useState('cash')
	const [day, setDay] = useState("2022-04-10")
	const [startTime, setStartTime] = useState("11:00")
	const [endTime, setEndTime] = useState("11:30")
	const [isCheckout, setIsCheckout] = useState(false)
	const [checkoutResponse, setCheckoutResponse] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [response, setResponse] = useState(null)
	const [initialCartData, setInitialCartData] = useState(null)
	const [initialCartProducts, setInitialCartProducts] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		callApi()
	}, [selectedTypeSelector, citySelector, selectedAddressSelector, selectedPickupLocationSelector, token, coupon, day, startTime, endTime])

	useEffect(() => {
		if (isCheckout) {
			callCheckoutApi()
		}
	}, [isCheckout])

	const callApi = async () => {
		setIsLoading(true)
		setResponse(null)
		await initializeUserApi()

		let { headers, clientType, prodType, orderType, selectedPickupLocation, selectedAddress, latitude, longitude } = getGeneralApiParams()

		let addressId = 0
		if (selectedTypeSelector === 'cnc') {
			if (!selectedPickupLocation || selectedPickupLocation === '') {
				toast.warn("SELECT PICKUP LOCATION")
			}
			else {
				addressId = selectedPickupLocation?.id
			}
		}
		else {
			if (selectedAddress && selectedAddress !== '') {
				addressId = selectedAddress.id
			}
		}

		let body = {
			coupon,
			notes,
			paymentMethod,
			address: addressId,
			showProducts: true,
			verify: true,
			prodType,
			day,
			startTime,
			endTime,
			clientType,
			orderType,
		}
		let url = "/order/cart/checkout?client_lat=" + latitude + "&client_long=" + longitude

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setResponse(apiResponse)
			setInitialCartData(apiResponse.data.data)
			setInitialCartProducts(apiResponse.data.data.products)
			setCouponMessage(apiResponse.data.data.couponMessage)
			setPaymentMethods(apiResponse.data.data.paymentInfo)
			dispatch(initialize(apiResponse.data.data.products))
			setErrorMessage('')
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			// toast.error(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsCheckout(false)
		}
	}

	const callCheckoutApi = async () => {
		setIsLoading(true)
		setCheckoutResponse(null)
		await initializeUserApi()

		let { headers, clientType, prodType, orderType, selectedPickupLocation, selectedAddress, latitude, longitude } = getGeneralApiParams()

		let addressId = 0
		if (selectedTypeSelector === 'cnc') {
			if (!selectedPickupLocation || selectedPickupLocation === '') {
				toast.warn("SELECT PICKUP LOCATION")
			}
			else {
				addressId = selectedPickupLocation?.id
			}
		}
		else {
			if (selectedAddress && selectedAddress !== '') {
				addressId = selectedAddress.id
			}
		}

		let body = {
			coupon,
			notes,
			paymentMethod,
			address: addressId,
			showProducts: true,
			verify: false,
			prodType,
			day,
			startTime,
			endTime,
			clientType,
			orderType,
		}
		let url = "/order/cart/checkout?client_lat=" + latitude + "&client_long=" + longitude

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setCheckoutResponse(apiResponse)
			dispatch(initialize([]))

		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			// toast.error(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsCheckout(false)
		}
	}

	return {
		isLoading,
		errorMessage,
		response,
		errorResponse,
		initialCartData,
		initialCartProducts,
		setCoupon,
		paymentMethods,
		setDay,
		setStartTime,
		setEndTime,
		setIsCheckout,
		setNotes,
		notes,
		coupon,
		setPaymentMethod,
		paymentMethod,
		couponMessage,
		checkoutResponse
	}
}

export const useCheckoutApi = () => {
	const dispatch = useDispatch()
	const selectedTypeSelector = useSelector(
		(state) => state.general.selectedType
	)
	const citySelector = useSelector((state) => state.general.city)
	const selectedAddressSelector = useSelector((state) => state.general.selectedAddress)
	const selectedPickupLocationSelector = useSelector((state) => state.general.pickupLocation)
	let { token } = getGeneralApiParams()
	const [coupon, setCoupon] = useState('')
	const [couponMessage, setCouponMessage] = useState('')
	const [notes, setNotes] = useState('')
	const [paymentMethod, setPaymentMethod] = useState('cash')
	const [paymentMethods, setPaymentMethods] = useState('cash')
	const [day, setDay] = useState("2022-04-10")
	const [startTime, setStartTime] = useState("11:00")
	const [endTime, setEndTime] = useState("11:30")
	const [isCheckout, setIsCheckout] = useState(false)
	const [isFetchCart, setIsFetchCart] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [response, setResponse] = useState(null)
	const [initialCartData, setInitialCartData] = useState(null)
	const [initialCartProducts, setInitialCartProducts] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		if (isFetchCart) {
			callApi()
		}
	}, [selectedTypeSelector, citySelector, selectedAddressSelector, selectedPickupLocationSelector, token, coupon, paymentMethod, day, startTime, endTime, isCheckout])

	const callApi = async () => {
		console.log("CALLED")
		setIsLoading(true)
		setResponse(null)
		await initializeUserApi()

		let { headers, clientType, prodType, orderType, selectedPickupLocation, selectedAddress, latitude, longitude } = getGeneralApiParams()

		let addressId = 0
		if (selectedTypeSelector === 'cnc') {
			if (!selectedPickupLocation || selectedPickupLocation === '') {
				toast.warn("SELECT PICKUP LOCATION")
			}
			else {
				addressId = selectedPickupLocation?.id
			}
		}
		else {
			if (selectedAddress && selectedAddress !== '') {
				addressId = selectedAddress.id
			}
		}

		let verify = isCheckout ? false : true

		let body = {
			coupon,
			notes,
			paymentMethod,
			address: addressId,
			showProducts: true,
			verify,
			prodType,
			day,
			startTime,
			endTime,
			clientType,
			orderType,
		}
		let url = "/order/cart/checkout?client_lat=" + latitude + "&client_long=" + longitude

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setResponse(apiResponse)
			setInitialCartData(apiResponse.data.data)
			setInitialCartProducts(apiResponse.data.data.products)
			setCouponMessage(apiResponse.data.data.couponMessage)
			setPaymentMethods(apiResponse.data.data.paymentInfo)
			dispatch(initialize(apiResponse.data.data.products))
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			// toast.error(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsCheckout(false)
		}
	}

	return {
		isLoading,
		errorMessage,
		response,
		errorResponse,
		initialCartData,
		initialCartProducts,
		setCoupon,
		paymentMethods,
		setDay,
		setStartTime,
		setEndTime,
		setIsCheckout,
		setNotes,
		notes,
		coupon,
		setPaymentMethod,
		paymentMethod,
		couponMessage,
		setIsFetchCart
	}
}

export const useSearchResultsApi = () => {
	const router = useRouter()
	const { term } = router.query
	let page = 1

	const [isLoading, setIsLoading] = useState(true)
	const [searchResults, setSearchResults] = useState(null)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		if (router.isReady) {
			callApi()
		}
	}, [router.query])

	const callApi = async () => {
		setIsLoading(true)
		await initializeUserApi()
		let { headers } = getGeneralApiParams()
		let url =
			"/catalog/products/search?page=" +
			page +
			"&size=25&term=" +
			term +
			"&category="

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setResponse(apiResponse)
			setSearchResults(apiResponse.data.data)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		searchResults,
		errorMessage,
		response,
		errorResponse,
	}
}
