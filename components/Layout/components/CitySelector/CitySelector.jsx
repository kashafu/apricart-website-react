import Popup from "../Popup/Popup"
import locationPinPNG from "../../../../public/assets/svgs/locationPinIcon.svg"
import Image from "next/image"
import SubmitButton from "../Buttons/SubmitButton"
import { useState } from "react"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"

const CitySelector = () => {
    let { city } = getGeneralApiParams()

	const [getcity, setcity] = useState(city)
    const [showPopup, setShowPopup] = useState(false)

    const handleCity = (event) => {
		setcity(event.target.value)
		// cookies.set("cities", event.target.value)
	}

    const togglePopup = () => {
		setShowPopup(!showPopup)
	}

    const closeButton = () => {
        // setcity(e.target.value)
		cookies.set("cities", getcity)
		setIsOpen(!isOpen)
		window.location.reload()
	}

	return (
		<div className="flex w-full justify-center">
			<div className="bg-slate-100 rounded-xl py-2 px-4">
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
						{getcity}
					</p>
				</button>
			</div>
            {showPopup && (
					<Popup
						content={
							<div className="flex flex-col items-center w-full h-full justify-around">
								<p className="text-main-blue font-bold text-xl">
									Select City
								</p>
								<div className="flex flex-col space-y-2">
									<div className="flex flex-row space-x-2 items-center">
										<input
											className=""
											type="radio"
											name="cities"
											value="karachi"
											checked={getcity === "karachi"}
											onChange={handleCity}
										/>
										<p className="text-main-bue font-bold">
											Karachi
										</p>
									</div>
									{/* <div className="flex flex-row space-x-2 items-center">
										<input
											className=""
											type="radio"
											name="cities"
											value="peshawar"
											checked={getcity === "peshawar"}
											onChange={handleCity}
										/>
										<p className="text-main-bue font-bold">
											Peshawar
										</p>
									</div> */}
								</div>
								<p className="text-main-blue font-bold text-sm">
									Home Delivery is currently unavailable in Peshawar, please install our app for Bulk Buy in Peshawar
								</p>
								<div className="w-3/4">
									<SubmitButton
										text={"Change City"}
										onClick={closeButton}
									/>
								</div>
							</div>
						}
						handleClose={togglePopup}
					/>
				)}
		</div>
	)
}

export default CitySelector
