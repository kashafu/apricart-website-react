import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { updatePickupLocation, updateSelectedType } from "../../../../redux/general.slice"
import Popup from "../Popup/Popup"
import SubmitButton from "../Buttons/SubmitButton"
import { usePickupLocationsApi } from "../../../../helpers/Api"
import Alert from "../Alerts/Alert"

export default function ClickAndCollectCard() {
	const dispatch = useDispatch()
	const router = useRouter()
	const selectedPickupLocationSelector = useSelector(state => state.general.pickupLocation)
	const reduxCart = useSelector((state) => state.cart)

	const { pickupLocations } = usePickupLocationsApi()
	const [selectedPickupLocation, setSelectedPickupLocation] = useState('')
	const [showPopup, setShowPopup] = useState(false)

	const [isShowAlert, setIsShowAlert] = useState(false)

	const closeButton = () => {
		setShowPopup(!showPopup)
		if (selectedPickupLocation !== '') {
			dispatch(updatePickupLocation(selectedPickupLocation))
			dispatch(updateSelectedType('cnc'))
			router.push('/')
		}
	}

	const AlertBox = () => {
		return (
			<>
				{isShowAlert && (
					<Alert
						text={"Attention: Some of the selected products may not be available if you change order type."}
						onClickOk={() => {
							setIsShowAlert(false)
							setShowPopup(!showPopup)
						}}
						onClickCancel={() => {
							setIsShowAlert(false)
						}}
					/>
				)}
			</>
		)
	}

	return (
		<>
			<AlertBox />
			<button
				className='items-center w-full h-full hover:scale-105 duration-300'
				onClick={() => {
					if (reduxCart.length > 0) {
						setIsShowAlert(true)
					}
					else {
						setShowPopup(!showPopup)
					}
				}}
			>
				<p className='font-nunito text-main-blue font-black lg:font-extrabold w-full text-xs md:text-base lg:text-sm 2xl:text-lg pl-1 lg:pl-2 leading-none'>
					Click & Collect
				</p>
			</button>
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
									{pickupLocations && pickupLocations.map((location) => {
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
							<div className="w-1/2">
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
		</>
	)
}
