import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import clickAndCollectIcon from "../../../../public/assets/svgs/clickAndCollectIcon.svg"
import { updatePickupLocation, updateSelectedType } from "../../../../redux/general.slice"
import Popup from "../Popup/Popup"
import SubmitButton from "../Buttons/SubmitButton"
import { usePickupLocationsApi } from "../../../../helpers/Api"

export default function ClickAndCollectCard({ isDisabled }) {
	const dispatch = useDispatch()
	const router = useRouter()
	const [style, setStlye] = useState('')
	const [disabledStyle, setDisabledStyle] = useState('')
	const selectedTypeSelector = useSelector((state) => state.general.selectedType)
	const selectedPickupLocationSelector = useSelector(state => state.general.pickupLocation)

	const { pickupLocations } = usePickupLocationsApi()
	const [selectedPickupLocation, setSelectedPickupLocation] = useState('')
	const [showPopup, setShowPopup] = useState(false)

	useEffect(() => {
		setStlye(selectedTypeSelector === 'cnc' ? 'bg-main-yellow' : '')
	}, [selectedTypeSelector])

	useEffect(() => {
		setDisabledStyle(isDisabled ? 'bg-main-grey grayscale' : '')
	}, [isDisabled])

	const closeButton = () => {
		setShowPopup(!showPopup)
		if (selectedPickupLocation !== '') {
			dispatch(updatePickupLocation(selectedPickupLocation))
			dispatch(updateSelectedType('cnc'))
			router.push('/')
		}
	}

	return (
		<>
			<button
				className={[style] + ' relative rounded-lg shadow flex grow items-center justify-between ' + [disabledStyle]}
				onClick={() => {
					setShowPopup(!showPopup)
				}}
				disabled={isDisabled}
			>
				<p className='font-nunito text-main-blue font-bold text-sm'>
					Click & Collect
				</p>
				<div className='w-[80px]'>
					<Image
						src={clickAndCollectIcon}
						layout={'responsive'}
						alt='icon'
					/>
				</div>
				{/* <div className="text-main-blue z-10 hidden absolute self-start font-bold lg:inline text-xl xl:text-2xl 2xl:text-3xl pl-4">
					<p className="font-nunito font-bold">Click & Collect</p>
				</div>
				<div className="self-end mt-auto relative w-full lg:w-[60%] lg:pr-4">
					<Image
						src={clickAndCollectIcon}
						layout={"responsive"}
						alt="click and collect"
					/>
				</div>
				<div className="text-main-blue lg:hidden flex font-semibold text-xs">
					<p className="font-nunito font-bold">Click & Collect</p>
				</div> */}
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
