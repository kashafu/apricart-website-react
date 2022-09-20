import Image from "next/image"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

import Popup from "../Popup/Popup"
import locationPinPNG from "../../../../public/assets/svgs/locationPinIcon.svg"
import SubmitButton from "../Buttons/SubmitButton"
import { usePickupLocationsApi } from "../../../../helpers/Api"
import { updatePickupLocation } from "../../../../redux/general.slice"

// type can be either checkout or select
const PickupLocationSelector = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const selectedPickupLocationSelector = useSelector(state => state.general.pickupLocation)

	const { pickupLocations } = usePickupLocationsApi()
	const [selectedPickupLocation, setSelectedPickupLocation] = useState('')
	const [showPopup, setShowPopup] = useState(false)

	const togglePopup = () => {
		setShowPopup(!showPopup)
	}

	const closeButton = () => {
		setShowPopup(!showPopup)
		dispatch(updatePickupLocation(selectedPickupLocation))
		router.push('/')
	}

	return (
		<div className="flex w-full justify-left">
			<div className="bg-slate-100 rounded-xl p-2 lg:bg-inherit lg:rounded-none lg:py-0 lg:px-0">
				<button
					className="flex flex-row space-x-2 items-center"
					onClick={togglePopup}
				>
					<div className="relative w-[25px] h-[25px]">
						<Image
							src={locationPinPNG}
							alt={"location icon"}
							layout={"fill"}
						/>
					</div>
					<p
						className={
							"font-bold text-base truncate max-w-[150px] xl:max-w-xs text-main-grey-800 capitalize font-nunito"
						}
					>
						{selectedPickupLocationSelector ? [selectedPickupLocationSelector.name] : "Select Pickup Location"}
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
							{/* DROPDOWN */}
							<div>
								<select
									className="col-span-2 h-full py-2 lg:px-4 text-xs lg:text-lg rounded-lg bg-slate-200"
									disabled={false}
									onChange={(e) => {
										setSelectedPickupLocation(JSON.parse(e.target.value))
									}}
									value={selectedPickupLocation}
								>
									<option
										value={''}
										disabled={true}
										selected={true}
									>
										Select Pickup Location
									</option>
									{pickupLocations.map((location) => {
										return (
											<option
												selected={selectedPickupLocationSelector ? selectedPickupLocationSelector.id == location.id : false}
												key={location.id}
												value={JSON.stringify(location)}
											>
												{location.name}
											</option>
										)
									})}
								</select>
							</div>
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
					}}
				/>
			)}
		</div>
	)
}

export default PickupLocationSelector
