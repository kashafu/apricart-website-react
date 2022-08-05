import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { base_url_api } from "../information.json"
import { getGeneralApiParams } from "./ApiHelpers"
import { useRouter } from "next/router"
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '../redux/cart.slice'
import { toast } from 'react-toastify'
import Cookies from "universal-cookie"

const cookies = new Cookies()

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
	let { isUserInitialized, latitude, longitude, headers } = getGeneralApiParams()

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
		cookies.remove('user-initialized', {path: '/'})
		cookies.set('user-initialized', true, {path: '/'})
	} catch (error) {
		console.log(error?.response)
	}
	// if (!isUserInitialized) {
	// }
}

export const useCategoriesApi = () => {
	const selectedTypeSelector = useSelector(
		(state) => state.general.selectedType
	)
	const [isLoading, setIsLoading] = useState(true)
	const [categories, setCategories] = useState(null)
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
		let url = "/catalog/categories/products?category=" +
			categoryId +
			"&page=1&size=100&sortType=&sortDirection=desc&instant=3"

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setResponse(apiResponse)
			setCategoryProducts(apiResponse.data.data)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, categoryProducts, errorMessage, response, errorResponse }
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
	const selectedTypeSelector = useSelector(
		(state) => state.general.selectedType
	)
	const [isLoading, setIsLoading] = useState(true)
	const [homeData, setHomeData] = useState(null)
	const [categories, setCategories] = useState(null)
	const [isPopupAd, setIsPopupAd] = useState(false)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		callApi()
	}, [selectedTypeSelector])

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

			console.log("URL", fullUrl(url))
			console.log("RESPONSE", apiResponse)

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
				]
			}
			url = "/order/cart/save?"
		}
		else {
			body = {
				userId,
				cart: [
					{
						sku,
						qty,
					},
				]
			}
			url = "/guest/cart/save?"
		}

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setResponse(apiResponse)
			toast.success("Added to Cart")

			let reduxCartData = {
				...product
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
		setIsPlaceOrder
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

export const useCheckoutApi = (checkoutData, checkoutAddress) => {
	const [isLoading, setIsLoading] = useState(true)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isCheckout, setIsCheckout] = useState(false)

	let { headers, clientType, prodType, orderType } = getGeneralApiParams()
	let lat = 0
	let long = 0
	let addressId = 0
	if (typeof checkoutAddress === "object") {
		lat = checkoutAddress ? checkoutAddress.mapLat : "0"
		long = checkoutAddress ? checkoutAddress.mapLong : "0"
		addressId = checkoutAddress ? checkoutAddress.id : ""
	} else {
		lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : "0"
		long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : "0"
		addressId = checkoutAddress ? JSON.parse(checkoutAddress).id : ""
	}
	let body = {
		...checkoutData,
		address: addressId,
		showProducts: true,
		verify: false,
		prodType: prodType,
		day: "",
		startTime: "",
		endTime: "",
		clientType: clientType,
		orderType: orderType,
	}
	let url = "/order/cart/checkout?client_lat=" +
		lat +
		"&client_long=" +
		long

	useEffect(() => {
		if (isCheckout) {
			callApi()
		}
	}, [isCheckout])

	const callApi = async () => {
		setIsLoading(true)
		toast.info('Processing Order')
		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setResponse(apiResponse)
			if (checkoutData.paymentMethod === "meezan") {
				let { paymentUrl } = response.data.data
				window.open(paymentUrl, "_blank").focus()
			}
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			toast.error(error?.response?.data?.message)
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
		setIsCheckout
	}
}

export const useIncrementQtyApi = (sku, qty, id) => {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isIncrement, setIsIncrement] = useState(false)

	useEffect(() => {
		if (isIncrement) {
			callApi()
		}
	}, [isIncrement])

	const callApi = async () => {
		setIsLoading(true)
		
		let { headers } = getGeneralApiParams()
		let url = "/order/cart/updateqty?"
		let body = {
			cart: [
				{
					sku: sku,
					qty: qty + 1,
				},
			],
		}

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setResponse(apiResponse)
			dispatch(incrementQuantity(id))
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			toast.error(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsIncrement(false)
		}
	}

	return {
		isLoading,
		errorMessage,
		response,
		errorResponse,
		setIsIncrement
	}
}

export const useDecrementQtyApi = (sku, qty, id) => {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isDecrement, setIsDecrement] = useState(false)

	useEffect(() => {
		if (isDecrement) {
			callApi()
		}
	}, [isDecrement])

	const callApi = async () => {
		setIsLoading(true)
		
		let { headers } = getGeneralApiParams()
		let url = "/order/cart/updateqty?"
		let body = {
			cart: [
				{
					sku: sku,
					qty: qty - 1,
				},
			],
		}

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setResponse(apiResponse)
			dispatch(decrementQuantity(id))
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			toast.error(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsDecrement(false)
		}
	}

	return {
		isLoading,
		errorMessage,
		response,
		errorResponse,
		setIsDecrement
	}
}

// const updateItemQty = async (sku, qty) => {
// 	let { token, headers, city, userId } = getGeneralApiParams();

// 	if (token) {
// 		let url =
// 			base_url_api +
// 			"/order/cart/updateqty?city=" +
// 			city +
// 			"&lang=en&client_type=apricart&userid=" +
// 			userId;
// 		let body = {
// 			cart: [
// 				{
// 					sku: sku,
// 					qty: qty,
// 				},
// 			],
// 		};

// 		try {
// 			let response = await axios.post(url, body, {
// 				headers: headers,
// 			});

// 			getCartDataApi();
// 		} catch (error) {
// 			console.log(error?.response);
// 			toast.error(error?.response?.data?.message);
// 		}
// 	} else {
// 		let url =
// 			base_url_api +
// 			"/guest/cart/updateqty?city=" +
// 			city +
// 			"&lang=en&client_type=apricart";
// 		let body = {
// 			userId: userId,
// 			cart: [
// 				{
// 					sku: sku,
// 					qty: qty,
// 				},
// 			],
// 		};

// 		try {
// 			let response = await axios.post(url, body, {
// 				headers: headers,
// 			});

// 			getCartDataApi();
// 		} catch (error) {
// 			console.log(error?.response);
// 			toast.error(error?.response?.data?.message);
// 		}
// 	}
// };

export const useDeleteItemApi = (sku, id) => {
	const dispatch = useDispatch()
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

		if(token){
			url = "/order/cart/delete?"
			body = {
				cart: [
					{
						sku: sku,
					},
				],
			}
		} else{
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
				data: body
			})
			setResponse(apiResponse)
			dispatch(removeFromCart(id))
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
		setIsDelete
	}
}

export const useInitialCartDataApi = (checkoutData) => {
	const [isLoading, setIsLoading] = useState(true)
	const [response, setResponse] = useState(null)
	const [initialCartData, setInitialCartData] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isGetInitialCartData, setIsGetInitialCartData] = useState(false)

	let { headers, clientType, prodType, orderType } = getGeneralApiParams()
	let lat = 0
	let long = 0
	let addressId = 0
	let body = {
		...checkoutData,
		address: addressId,
		showProducts: true,
		verify: true,
		prodType: prodType,
		day: "",
		startTime: "",
		endTime: "",
		clientType: clientType,
		orderType: orderType,
	}
	let url = "/order/cart/checkout?client_lat=" +
		lat +
		"&client_long=" +
		long

	useEffect(() => {
		if (isGetInitialCartData) {
			callApi()
		}
	}, [isGetInitialCartData])

	const callApi = async () => {
		setIsLoading(true)
		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setResponse(apiResponse)
			setInitialCartData(apiResponse.data.data)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			toast.error(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsGetInitialCartData(false)
		}
	}

	return {
		isLoading,
		errorMessage,
		response,
		errorResponse,
		setIsGetInitialCartData,
		initialCartData
	}
}

export const useCartDataApi = (checkoutData, checkoutAddress) => {
	const [isLoading, setIsLoading] = useState(true)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [cartData, setCartData] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isGetCartData, setIsGetCartData] = useState(false)

	let { headers, clientType, prodType, orderType } = getGeneralApiParams()
	let lat = 0
	let long = 0
	let addressId = 0
	if (typeof checkoutAddress === "object") {
		lat = checkoutAddress ? checkoutAddress.mapLat : "0"
		long = checkoutAddress ? checkoutAddress.mapLong : "0"
		addressId = checkoutAddress ? checkoutAddress.id : ""
	} else {
		lat = checkoutAddress ? JSON.parse(checkoutAddress).mapLat : "0"
		long = checkoutAddress ? JSON.parse(checkoutAddress).mapLong : "0"
		addressId = checkoutAddress ? JSON.parse(checkoutAddress).id : ""
	}
	let body = {
		...checkoutData,
		address: addressId,
		showProducts: true,
		verify: true,
		prodType: prodType,
		day: "",
		startTime: "",
		endTime: "",
		clientType: clientType,
		orderType: orderType,
	}
	let url = "/order/cart/checkout?client_lat=" +
		lat +
		"&client_long=" +
		long

	useEffect(() => {
		if (isGetCartData) {
			callApi()
		}
	}, [isGetCartData])

	const callApi = async () => {
		setIsLoading(true)
		toast.info('Processing Order')
		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setResponse(apiResponse)
			setCartData(apiResponse.data.data)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			toast.error(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsGetCartData(false)
		}
	}

	return {
		isLoading,
		errorMessage,
		response,
		errorResponse,
		setIsGetCartData,
		cartData
	}
}