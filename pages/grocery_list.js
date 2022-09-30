import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

import { getGeneralApiParams } from "../helpers/ApiHelpers"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import SelectAddress from "../components/Layout/components/Address/SelectAddress"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import { base_url_api } from "../information.json"
import TextArea from "../components/Layout/components/Input/TextArea"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import SuccessText from '../components/Layout/components/Typography/SuccessText'

export default function GroceryList() {
	const router = useRouter()
	let { selectedAddress } = getGeneralApiParams()

	const [address, setAddress] = useState(
		selectedAddress ? selectedAddress : null
	)
	const [list, setList] = useState("")
	const [isDisabled, setIsDisabled] = useState(false)
	const [successText, setSuccessText] = useState('')

	const placeOrderApi = async () => {
		let { userId, headers, city } = getGeneralApiParams()
		let url =
			base_url_api +
			"/order/checkout/manual?client_type=apricart&userid=" +
			userId
		let addressId = 0
		if (typeof address === "object") {
			addressId = address ? address.id : ""
		} else {
			addressId = address ? JSON.parse(address).id : ""
		}
		let formData = new FormData()
		formData.append("city", city)
		formData.append("lang", "en")
		formData.append("userid", userId)
		formData.append("coupon", "")
		formData.append("address", addressId)
		formData.append("orderType", "delivery")
		formData.append("notes", list)
		formData.append("files", [])
		formData.append("storeid", 1)
		formData.append("payment", "cash")

		toast.info("Placing Order")
		setIsDisabled(true)
		try {
			let response = await axios.post(url, formData, { headers: headers })

			toast.success(response.data?.message)
			setSuccessText(response.data?.message)
		} catch (error) {
			toast.error(error.response?.data?.message)
			setIsDisabled(false)
		}
	}

	return (
		<div className="p-2">
			<HeadTag title={"Grocery List"} />
			<div className="flex w-full justify-center">
				<section className="flex flex-col p-2 space-y-4 lg:w-2/3 items-center align-center bg-slate-100 shadow rounded-3xl">
					<PageHeading text={"Type Your Grocery List"} />
					<SelectAddress
						type={"checkout"}
					/>
					<TextArea
						label={"Grocery List"}
						placeHolder={"Type in or paste your grocery list here"}
						onChange={setList}
						value={list}
						type={"textarea"}
					/>
					<SubmitButton
						text={"Place Order"}
						onClick={placeOrderApi}
						disabled={isDisabled}
					/>
					{successText !== '' && (
						<>
							<SuccessText
								text={successText}
							/>
							<SubmitButton
								text={"Continue Shopping"}
								onClick={() => {
									router.push('/')
								}}
							/>
						</>
					)}
				</section>
			</div>
		</div>
	)
}
