import axios from "axios"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { base_url_api } from "../information.json"
import { getGeneralApiParams } from "./ApiHelpers"

export const useCategoriesApi = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState(null)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		callApi()
	}, [])

	const callApi = async () => {
		setIsLoading(true)
		let { city, headers, userId } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/categories?level=all&client_type=apricart&city=" +
			city +
			"&userid=" +
			userId

		try {
			let apiResponse = await axios.get(url, {
				headers: headers,
			})
			setResponse(apiResponse)
			setData(apiResponse.data.data)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, data, errorMessage, response, errorResponse }
}

export const useHomeApi = () => {
	const selectedTypeSelector = useSelector(
		(state) => state.general.selectedType
	)
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState(null)
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
		let {
			city,
			latitude,
			longitude,
			userId,
			headers,
			prodType,
			clientType,
			orderType,
		} = getGeneralApiParams()

		let url =
			base_url_api +
			"/home/all?client_lat=" +
			latitude +
			"&client_long=" +
			longitude +
			"&city=" +
			city +
			"&lang=en&userid=" +
			userId +
			"&web=true&client_type=" +
			clientType +
			"&prod_type=" +
			prodType +
			"&order_type=" +
			orderType

		try {
			let apiResponse = await axios.get(url, {
				headers: headers,
			})
			setResponse(apiResponse)
			setData(apiResponse.data.data)
			setCategories(apiResponse.data.data.categories)
			setIsPopupAd(apiResponse.data.data.dialog)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, data, errorMessage, response, errorResponse, isPopupAd, categories }
}
