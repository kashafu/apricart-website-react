import axios from "axios"
import { useState, useEffect } from "react"
import { base_url_api } from "../information.json"
import { getGeneralApiParams } from "./ApiHelpers"

export const useTestApi = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState(null)
	const [response, setResponse] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(()=>{
		callApi()
	}, [])

	const callApi = async () => {
		let { city, headers, userId } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/categories?level=all&client_type=apricart&city=" +
			city +
			"&userid=" +
			userId
	
		try {
			setResponse(
				await axios.get(url, {
					headers: headers,
				})
			)
			setData(response.data.data)
		} catch (error) {
			setErrorResponse(error?.response)
			setErrorMessage(error?.response?.data?.message)
		}
		setIsLoading(false)
	}

	return { isLoading, data, errorMessage, response, errorResponse }
}
