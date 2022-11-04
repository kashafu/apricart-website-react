import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { useState } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import { updateCity, updateSelectedAddress } from "../../../../redux/general.slice"
import AddAddressCard from "./AddAddressCard"
import { useDeleteAddressApi } from "../../../../helpers/Api"

export default function SingleAddressListing({ listing }) {
	let { address, area, city, name, phoneNumber, email, id } = listing

	const selectedAddressSelector = useSelector(state => state.general.selectedAddress)
	const dispatch = useDispatch()
	const router = useRouter()

	const { setData, setIsRemove } = useDeleteAddressApi()
	const [showEdit, setShowEdit] = useState(false)

	const onClickHandle = () => {
		toast.success('Selected Address Updated')
		dispatch(updateSelectedAddress(listing))
		dispatch(updateCity(listing.city.toLowerCase()))
		router.push('/')
	}

	return (
		<div className="flex flex-col border-2 rounded-2xl mx-4 overflow-hidden space-y-2">
			<button
				className={[selectedAddressSelector?.id === id ? "bg-lime-300" : ""] + " p-2 space-y-2 rounded-lg"}
				onClick={onClickHandle}
			>
				<p className="text-lg font-bold">
					{name}, {phoneNumber}
				</p>
				<p>
					{email}
				</p>
				<p>
					{address}, {area}, {city}
				</p>
			</button>
			<div className="w-full flex flex-row justify-center items-center space-x-12 my-2  px-4">
				<button
					onClick={() => {
						setShowEdit(!showEdit)
					}}
					className="bg-main-yellow w-full py-2 rounded-lg sm:w-1/3"
				>
					<p className="text-white font-bold">
						EDIT
					</p>
				</button>
				<button
					className="bg-red-500 w-full py-2 rounded-lg sm:w-1/3"
					onClick={() => {
						setData({
							id: id
						})
						setIsRemove(true)
					}}
				>
					<p className="text-white font-bold">
						DELETE
					</p>
				</button>
			</div>
			{showEdit && (
				<AddAddressCard
					type={"edit"}
					previousAddress={listing}
					setShow={setShowEdit}
				/>
			)}
		</div>
	)
}
