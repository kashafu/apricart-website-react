import Popup from "../Popup/Popup"
import locationPinPNG from "../../../../public/assets/svgs/locationPinIcon.svg"
import Image from "next/image"
import SubmitButton from "../Buttons/SubmitButton"
import { useEffect, useState } from "react"
import Dropdown from "../Input/Dropdown"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { usePickupLocationsApi } from "../../../../helpers/Api"

const PickupLocationSelector = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	const { pickupLocations } = usePickupLocationsApi()
	const [selectedPickupLocation, setSelectedPickupLocation] = useState({})
	const [showPopup, setShowPopup] = useState(false)

	useEffect(() => {
		console.log(selectedPickupLocation)
	}, [selectedPickupLocation])

	const togglePopup = () => {
		setShowPopup(!showPopup)
	}

	const closeButton = () => {
		setShowPopup(!showPopup)
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
							/>
							<div className="w-3/4">
								<SubmitButton
									text={"Change City"}
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
