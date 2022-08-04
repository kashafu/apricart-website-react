import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { base_url_api } from "../information.json"
import { getGeneralApiParams } from "./ApiHelpers"
import { useRouter } from "next/router"
import { addToCart } from '../redux/cart.slice'
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
			cookies.set('user-initialized', true)
		} catch (error) {
			console.log(error?.response)
		}
	}
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

		let url = "/options/all?"

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