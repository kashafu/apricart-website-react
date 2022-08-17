import Popup from "../Popup/Popup"
import locationPinPNG from "../../../../public/assets/svgs/locationPinIcon.svg"
import Image from "next/image"
import SubmitButton from "../Buttons/SubmitButton"
import { useState, useEffect } from "react"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { setCookie } from "../../../../helpers/Cookies"
import { useDispatch } from "react-redux"
import { updateCity } from "../../../../redux/general.slice"
import { useRouter } from "next/router"

const CitySelector = () => {
	let { city } = getGeneralApiParams()
	const dispatch = useDispatch()
	const router = useRouter()

	const [getcity, setcity] = useState(city)
	const [showPopup, setShowPopup] = useState(false)

	useEffect(() => {
		if (city == null) {
			setcity("karachi")
			setCookie("cities", "karachi")
			dispatch(updateCity(karachi))
			getLocation()
		}
	}, [])

	const handleCity = (event) => {
		setcity(event.target.value)
	}

	const togglePopup = () => {
		setShowPopup(!showPopup)
	}

	const closeButton = () => {
		setCookie("cities", getcity)
		dispatch(updateCity(getcity))
		setShowPopup(!showPopup)
		router.push('/')
	}

	const getLocation = () => {
		if (!navigator.geolocation) {
			return
		}

		navigator.geolocation.getCurrentPosition((position) => {
			let latitude, longitude
			latitude = position.coords.latitude
			longitude = position.coords.longitude
			// KARACHI
			let karachiCoords = {
				top: [25.633730508113278, 67.36401298889072],
				bottom: [24.806311517712324, 67.18548517144208],
				left: [24.83871833773748, 66.65264830090317],
				right: [25.139943073700493, 67.64691091500156],
			}

			if (
				latitude <= karachiCoords.top[0] &&
				latitude >= karachiCoords.bottom[0] &&
				longitude <= karachiCoords.right[1] &&
				longitude >= karachiCoords.left[1]
			) {
				setcity("karachi")
				setCookie("cities", "karachi")
				return
			}

			// PESHAWAR
			let peshawarCoords = {
				top: [34.1040966916378, 71.56477299064852],
				bottom: [33.856413627696355, 71.52769413625535],
				left: [33.99144768127041, 71.38281194594128],
				right: [34.025599547506026, 71.75909365348681],
			}

			if (
				latitude <= peshawarCoords.top[0] &&
				latitude >= peshawarCoords.bottom[0] &&
				longitude <= peshawarCoords.right[1] &&
				longitude >= peshawarCoords.left[1]
			) {
				setcity("peshawar")
				setCookie("cities", "peshawar")
				return
			}
		})
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
								<div className="flex flex-row space-x-2 items-center">
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
								</div>
							</div>
							<p className="text-main-blue font-bold text-sm">
								Only Bulk Buy is available in Peshawar
							</p>
							<div className="w-3/4">
								<SubmitButton
									text={"Change City"}
									onClick={() => {
										closeButton()
										// togglePopup()
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

export default CitySelector
