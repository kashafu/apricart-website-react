import { useState } from "react"
import axios from "axios"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import SelectAddress from "../components/Layout/components/Address/SelectAddress"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import Paragraph from "../components/Layout/components/Typography/Paragraph"
import { base_url_api } from "../information.json"
import { toast } from "react-toastify"
import TextArea from "../components/Layout/components/Input/TextArea"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"

export default function GroceryList() {
	let { selectedAddress } = getGeneralApiParams()

	const [address, setAddress] = useState(
		selectedAddress ? selectedAddress : null
	)
	const [list, setList] = useState("")

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
		let body = {
			city: city,
			lang: 'en',
			userid: userId,
			address: addressId,
			coupon: "",
			files: "[]",
			storeid: 1,
			payment: "cash",
			orderType: "pickup",
			notes: list
		}

		console.log(body);
		toast.info("Placing Order")
		try {
			let response = await axios.post(url, body, { headers: headers })

			toast.success(response.data?.message)
			console.log(response.data)
		} catch (error) {
			toast.error(error.response?.data?.message)
			console.log(error.response)
		}
	}

	return (
		<>
			<HeadTag title={"Grocery List"} />
			<section className="flex flex-col p-2 space-y-4 lg:w-1/3 items-center align-center bg-slate-100 shadow rounded-3xl">
				<PageHeading text={"Type Your Grocery List"} />
				{/* <div>
					<Paragraph
						text={
							"Disclaimer: Delivery only in Karachi and Peshawar"
						}
					/>
					<Paragraph
						text={
							"For online payments, a payment link is shared with you once your order has been Purchased."
						}
					/>
				</div> */}
				<SelectAddress
					setAddress={setAddress}
					type={"checkout"}
					dropDownSelectedAddress={address}
				/>
				<TextArea
					label={"Grocery List"}
					placeHolder={"Type in or paste your grocery list here"}
					onChange={setList}
					value={list}
					type={"textarea"}
				/>
				<SubmitButton text={"Place Order"} onClick={placeOrderApi} />
			</section>
		</>
	)
}
