import { useState } from "react"
import Cookies from "universal-cookie"
import AddressCard from "./AddressCard"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { base_url_api } from "../../../../information.json"
import axios from "axios"
import { useDispatch } from "react-redux"
import { updateSelectedAddress } from "../../../../redux/general.slice"

export default function SingleAddressListing({
	listing,
	isSelected,
	setAddress,
	updateSavedAddresses,
}) {
	const cookies = new Cookies()
	const dispatch = useDispatch()

	let { address, area, city, name, phoneNumber, email } = listing
	let style = isSelected ? "bg-lime-300" : ""

	const [showEdit, setShowEdit] = useState(false)

	const deleteAddressApi = async () => {
		let { headers, userId } = getGeneralApiParams()
		let url =
			base_url_api + "/home/address/delivery/delete?client_type=apricart&userid=" + userId
		let body = {
			id: listing.id,
		}

		try {
			let response = await axios.delete(url, {
				headers: headers,
				data: body,
			})

			updateSavedAddresses()
		} catch (error) {
			console.log(error?.response)
		}
	}

	const onClickHandle = () => {
		cookies.set("selected-address", listing)
		dispatch(updateSelectedAddress(listing))
		setAddress(listing)
	}

	return (
		<div className="flex flex-col border-2 rounded-2xl mx-4 overflow-hidden space-y-2">
			<button onClick={onClickHandle} className={[style] + ' p-2 space-y-2 rounded-lg'}>
				<p className="text-lg font-bold">
					{name}, {phoneNumber}
				</p>
				<p>{email}</p>
				<p>
					{address}, {area}, {city}
				</p>
			</button>
			<div className="w-full flex flex-row justify-around space-x-12 px-4">
				<button
					onClick={() => {
						setShowEdit(!showEdit)
					}}
					className="bg-main-yellow w-full py-2 rounded-lg"
				>
					<p className="text-white font-bold">EDIT</p>
				</button>
				<button
					onClick={deleteAddressApi}
					className="bg-red-500 w-full py-2 rounded-lg"
				>
					<p className="text-white font-bold">DELETE</p>
				</button>
			</div>
			{showEdit && (
				<AddressCard
					type={"edit"}
					previousAddress={listing}
					updateSavedAddresses={updateSavedAddresses}
					setShow={setShowEdit}
				/>
			)}
		</div>
	)
}
