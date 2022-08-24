import Popup from "../Popup/Popup"
import locationPinPNG from "../../../../public/assets/svgs/locationPinIcon.svg"
import Image from "next/image"
import SubmitButton from "../Buttons/SubmitButton"
import { useEffect, useState } from "react"
import Dropdown from "../Input/Dropdown"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { usePickupLocationsApi } from "../../../../helpers/Api"
import { updatePickupLocation } from "../../../../redux/general.slice"
import { setCookie } from "../../../../helpers/Cookies"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { useSelector } from "react-redux"

const PickupLocationSelector = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	// const selectedPickupLocationSelector = useSelector(state => state.general.pickupLocation)
	// let { selectedPickupLocation } = getGeneralApiParams()
	// TODO synchronize the selected pickup locations

	const { pickupLocations } = usePickupLocationsApi()
	const [selectedPickupLocation, setSelectedPickupLocation] = useState()
	const [showPopup, setShowPopup] = useState(false)

	const togglePopup = () => {
		setShowPopup(!showPopup)
	}

	const closeButton = () => {
		setShowPopup(!showPopup)
		dispatch(updatePickupLocation(selectedPickupLocation))
		setCookie("selected-pickup-location", selectedPickupLocation)
		router.push('/')
	}

	return (
		<div className="flex w-full justify-center">
			<div className="bg-slate-100 rounded-xl py-2 px-4 lg:bg-inherit lg:rounded-none lg:py-0 lg:px-0">
				<button
					className="flex flex-row space-x-2 items-center"
					onClick={togglePopup}
				>
					<div className="relative w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]">
						<Image
							src={locationPinPNG}
							alt={"location icon"}
							layout={"fill"}
						/>
					</div>
					<p
						className={
							"font-bold text-base text-main-grey-800 lg:text-lg capitalize"
						}
					>
						{selectedPickupLocationSelector.name}
					</p>
				</button>
			</div>
			{showPopup && (
				<Popup
					content={
						<div className="flex flex-col items-center w-full h-full justify-around">
							<p className="text-main-blue font-bold text-xl">
								Select Pickup Location
							</p>
							<Dropdown
								label="Pickup Locations"
								options={pickupLocations}
								placeholder={"Select Pickup Location"}
								optionText={"name"}
								onChange={setSelectedPickupLocation}
								customValue={selectedPickupLocation}
							/>
							<div className="w-3/4">
								<SubmitButton
									text={"Select Location"}
									onClick={() => {
										closeButton()
									}}
								/>
							</div>
						</div>
					}
					handleClose={() => {
						closeButton()
						togglePopup()
					}}
				/>
			)}
		</div>
	)
}

export default PickupLocationSelector
