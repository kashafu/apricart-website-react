import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

import { base_url_api } from "../information.json"
import { getGeneralApiParams } from "./ApiHelpers"
import {
	addToCart,
	initialize,
	removeFromCart,
	updateQuantity,
} from "../redux/cart.slice"
import { updateTicker } from "../redux/general.slice"
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
	const [subCategories, setSubCategories] = useState(null)
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
			setCategoryProducts(apiResponse.data.data.products)
			setSubCategories(apiResponse.data.data.categories)
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
		subCategories
	}
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
		errorResponse,
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
		setResponse(null)
		setErrorResponse(null)

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
	let notes = useRef('')
	const [paymentMethod, setPaymentMethod] = useState('cash')
	const [paymentMethods, setPaymentMethods] = useState('cash')
	const [day, setDay] = useState("2022-04-10")
	const [startTime, setStartTime] = useState("11:00")
	const [endTime, setEndTime] = useState("11:30")
	const [isCheckout, setIsCheckout] = useState(false)
	const [isFetchCart, setIsFetchCart] = useState(false)
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

	useEffect(() => {
		if (isFetchCart) {
			callApi()
		}
	}, [isFetchCart])

	const callApi = async () => {
		setIsLoading(true)
		setResponse(null)
		await initializeUserApi()

		let { headers, clientType, prodType, orderType, selectedPickupLocation, selectedAddress, latitude, longitude } = getGeneralApiParams()

		let addressId = 0
		if (selectedTypeSelector === 'cnc') {
			if (!selectedPickupLocation || selectedPickupLocation === '') {
				let toastId = 'pickup'
				toast.warn("SELECT PICKUP LOCATION", {
					toastId: toastId
				})
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
			notes: notes.current,
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
			setIsFetchCart(false)
		}
	}

	const callCheckoutApi = async () => {
		toast.info("Processing order")
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
			notes: notes.current,
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
		initialCartData,
		initialCartProducts,
		setCoupon,
		paymentMethods,
		setDay,
		setStartTime,
		setEndTime,
		setIsCheckout,
		notes,
		coupon,
		setPaymentMethod,
		paymentMethod,
		couponMessage,
		checkoutResponse,
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
			setSearchResults(apiResponse.data.data.products)
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

export const useRecommendedProductsApi = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [recommendedProducts, setRecommendedProducts] = useState(null)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		callApi()
	}, [])

	const callApi = async () => {
		setIsLoading(true)
		await initializeUserApi()
		let { headers } = getGeneralApiParams()

		let url = "/catalog/recommended?page=1&size=20"

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setResponse(apiResponse)
			setRecommendedProducts(apiResponse.data.data.products)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		recommendedProducts,
		errorMessage,
		response,
		errorResponse,
	}
}

export const useMostViewedProductsApi = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [mostViewedProducts, setMostViewedProducts] = useState(null)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		callApi()
	}, [])

	const callApi = async () => {
		setIsLoading(true)
		await initializeUserApi()
		let { headers } = getGeneralApiParams()

		let url = "/catalog/mostviewed?page=1&size=20"

		try {
			let apiResponse = await axios.get(fullUrl(url), {
				headers: headers,
			})
			setResponse(apiResponse)
			setMostViewedProducts(apiResponse.data.data.products)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		mostViewedProducts,
		errorMessage,
		response,
		errorResponse,
	}
}

export const useLoginApi = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isLogin, setIsLogin] = useState(false)
	const [data, setData] = useState({
		"username": '',
		"password": ''
	})

	useEffect(() => {
		if (isLogin) {
			callApi()
		}
	}, [isLogin])

	const callApi = async () => {
		setIsLoading(true)
		let { userId, headers } = getGeneralApiParams()

		let url = "/auth/open/login?"
		let body = {
			"guestuserid": userId,
			"username": '92' + data.username,
			"password": data.password
		}

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			if (apiResponse.data.status == 1) {
				setCookie("cookies-token", apiResponse.data.data.token)
				setCookie("cookies-name", apiResponse.data.data.name)
				setCookie("cookies-email", apiResponse.data.data.email)
				setCookie("cookies-phoneNumber", apiResponse.data.data.phoneNumber)
				setResponse(apiResponse)
				setErrorMessage('')
				setErrorResponse(null)
			}
			else {
				setErrorMessage(apiResponse.data.message)
				setErrorResponse(apiResponse)
			}
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsLogin(false)
		}
	}

	return {
		isLoading,
		setData,
		setIsLogin,
		errorMessage,
		response,
		errorResponse,
	}
}

export const useSendOtpApi = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isSendOtp, setIsSendOtp] = useState(false)
	const [phoneNumber, setPhoneNumber] = useState('')

	useEffect(() => {
		if (isSendOtp) {
			callApi()
		}
	}, [isSendOtp])

	const callApi = async () => {
		setIsLoading(true)
		let { headers } = getGeneralApiParams()

		let url = "/auth/open/otp?"
		let body = {
			"phoneNumber": '92' + phoneNumber
		}

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})
			setResponse(apiResponse)
			toast.success(apiResponse.data.message)
			setErrorMessage('')
			setErrorResponse(null)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsSendOtp(false)
		}
	}

	return {
		isLoading,
		setPhoneNumber,
		setIsSendOtp,
		errorMessage,
		response,
		errorResponse,
	}
}

export const useResetPasswordApi = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isSendOtp, setIsSendOtp] = useState(false)
	const [data, setData] = useState({
		"phoneNumber": '',
		"password": '',
		"otp": ''
	})

	useEffect(() => {
		if (isSendOtp) {
			callApi()
		}
	}, [isSendOtp])

	const callApi = async () => {
		setIsLoading(true)
		let { headers } = getGeneralApiParams()

		let url = "/auth/open/password/forgot?"
		let body = {
			"phoneNumber": '92' + data.phoneNumber,
			"password": data.password,
			"otp": data.otp
		}

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})

			setResponse(apiResponse)
			toast.success(apiResponse.data.message)
			setErrorMessage('')
			setErrorResponse(null)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsSendOtp(false)
		}
	}

	return {
		isLoading,
		setData,
		setIsSendOtp,
		errorMessage,
		response,
		errorResponse,
	}
}

export const useRegisterApi = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isRegister, setIsRegister] = useState(false)
	const [data, setData] = useState({
		"email": '',
		"name": '',
		"phoneNumber": '',
		"password": '',
	})

	useEffect(() => {
		if (isRegister) {
			callApi()
		}
	}, [isRegister])

	const callApi = async () => {
		setIsLoading(true)
		let { userId, headers } = getGeneralApiParams()

		let url = "/auth/open/register?"
		let body = {
			"email": data.email,
			"name": data.name,
			"phoneNumber": '92' + data.phoneNumber,
			"password": data.password,
			"guestuserid": userId,
		}

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})

			setResponse(apiResponse)
			toast.success(apiResponse.data?.message)
			setErrorMessage('')
			setErrorResponse(null)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsRegister(false)
		}
	}

	return {
		isLoading,
		setData,
		setIsRegister,
		errorMessage,
		response,
		errorResponse,
	}
}

export const useVerifyOtpApi = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isVerifyOtp, setIsVerifyOtp] = useState(false)
	const [data, setData] = useState({
		"phoneNumber": '',
		"otp": '',
	})

	useEffect(() => {
		if (isVerifyOtp) {
			callApi()
		}
	}, [isVerifyOtp])

	const callApi = async () => {
		setIsLoading(true)
		let { userId, headers } = getGeneralApiParams()

		let url = "/auth/open/otp/verify?"
		let body = {
			"phoneNumber": '92' + data.phoneNumber,
			"otp": data.otp
		}

		try {
			let apiResponse = await axios.post(fullUrl(url), body, {
				headers: headers,
			})

			setResponse(apiResponse)
			toast.success(apiResponse.data?.message)
			setErrorMessage('')
			setErrorResponse(null)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
			toast.error(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
			setIsVerifyOtp(false)
		}
	}

	return {
		isLoading,
		setData,
		setIsVerifyOtp,
		errorMessage,
		response,
		errorResponse,
	}
}