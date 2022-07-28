import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "react-bootstrap"
import Image from "next/image"
import Link from "next/link"
import Popup from "../Popup/Popup"
import Cookies from "universal-cookie"
import Marquee from "react-fast-marquee"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { updateTicker } from "../../../../redux/general.slice"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { base_url_api } from "../../../../information.json"

// IMAGES
// import bikePNG from "../../../../public/assets/images/bike.png";
import locationPinPNG from "../../../../public/assets/images/location.png"
import phonePNG from "../../../../public/assets/images/phone.png"
import logoPNG from "../../../../public/assets/images/logo.png"
import SubmitButton from "../Buttons/SubmitButton"

export default function Layout() {
	const cookies = new Cookies()
	const dispatch = useDispatch()
	const router = useRouter()
	const addressSelector = useSelector(
		(state) => state.general.selectedAddress
	)
	const tickerSelector = useSelector((state) => state.general.ticker)

	let pStyle =
		"font-lato font-bold text-sm lg:text-md text-black lg:text-base"
	let { city } = getGeneralApiParams()

	const [getcity, setcity] = useState(city)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (cookies.get("cities") == null) {
			cookies.set("cities", "karachi")
			getLocation()
		}
		getOptionsDataApi()
	}, [])

	const getOptionsDataApi = async () => {
		let url = base_url_api + "/options/all?client_type=apricart"

		try {
			let response = await axios.get(url)

			response.data.data.forEach((item) => {
				if (item.key === "ticker") {
					dispatch(updateTicker(item.value))
					return
				}
			})
		} catch (error) {
			console.log(error)
		}
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
				cookies.set("cities", "karachi")
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
				cookies.set("cities", "peshawar")
				return
			}
		})
	}

	const togglePopup = () => {
		setIsOpen(!isOpen)
	}

	const closeButton = () => {
		setIsOpen(!isOpen)
		window.location.reload()
	}

	const handleCity = (event) => {
		setcity(event.target.value)
		cookies.set("cities", event.target.value)
	}

	const submitCities = (e) => {
		e.preventDefault()
		setcity(e.target.value)
	}

	return (
		<header className="flex flex-col">
			<div className="flex flex-row w-full bg-main-yellow lg:justify-between px-2 lg:px-12 items-center h-[50px]">
				{/* TICKER */}
				{/* <div className="flex flex-row items-center h-full">
                    <div className="hidden lg:inline flex items-center bg-main-red px-2 h-2/3">
                        <p className="text-white font-roboto font-bold text-xs truncate md:text-xl">
                            Latest Update
                        </p>
                    </div>
                    <div className="overflow-x-auto text-center">
                        <p className="font-lato text-sm font-bold text-main-blue whitespace-nowrap">
                            {tickerSelector}
                        </p>
                    </div>
                </div> */}
				{/* ARPICART LOGO, LOCATION AND SELECTED ADDRESS */}
				<div className="flex flex-row items-center justify-between">
					{/* APRICART LOGO shown on phone, hidden on desktop*/}
					<div className="relative min-w-[100px] w-1/6 lg:hidden">
						<Link href={"/"} passHref>
							<button className="flex">
								<Image
									src={logoPNG}
									alt={"logo"}
									// layout={'fill'}
								/>
							</button>
						</Link>
					</div>
					{/* TICKER */}
					<div className="flex flex-row items-center h-full md:space-x-2">
						<div className="hidden lg:inline flex items-center bg-main-red px-2 h-2/3">
							<p className="text-white font-roboto font-bold text-xs truncate md:text-lg">
								Latest Update
							</p>
						</div>
						<Marquee speed={50} className='overflow-hidden'>
							<p className="text-center text-sm font-bold text-main-blue">
								{tickerSelector}
							</p>
						</Marquee>
					</div>
					{/* DELIVERY */}
					{/* <div className="hidden lg:inline-flex flex flex-row space-x-2 items-center">
                        <div className="relative w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]">
                            <Image 
                                src={bikePNG} 
                                alt={"bike icon"}
                                layout={"fill"}
                            />
                        </div>
                        <p className={pStyle}>
                            Fast Delivery
                        </p>
                    </div> */}
					{/* LOCATION AND SELECTED ADDRESS */}
					{/* <div className="flex flex-row space-x-4 lg:space-x-12 items-center"> */}
					{/* LOCATION */}
					{/* <div>
                            <button
                                className="flex flex-row space-x-2 items-center"
                                onClick={togglePopup}
                            >
                                <div className="relative w-[12px] h-[15px] lg:w-[19px] lg:h-[22px]">
                                    <Image
                                        src={locationPinPNG}
                                        alt={"location icon"}
                                        layout={"fill"}
                                    />
                                </div>
                                <p className={pStyle + " capitalize"}>
                                    {getcity}
                                </p>
                            </button>
                        </div> */}
					{/* CURRENT SELECTED ADDRESS */}
					{/* <div
                            className={
                                pStyle + " capitalize flex flex-row space-x-2"
                            }
                        >
                            <button
                                onClick={() => {
                                    router.push("/address");
                                }}
                            >
                                {addressSelector ? (
                                    <p>{addressSelector.area}</p>
                                ) : (
                                    <p className="truncate">
                                        Select Delivery Address
                                    </p>
                                )}
                            </button>
                        </div> */}
					{/* LANGUAGE */}
					{/* <div>
                            <p className={pStyle}>
                                English
                            </p>
                        </div> */}
					{/* </div> */}
				</div>
				{/* PHONE NUMBER hidden on phone, shown on desktop*/}
				<div className="hidden flex flex-row space-x-2 items-center lg:inline-flex pl-2 pr-4">
					<div className="relative w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]">
						<Image
							src={phonePNG}
							alt={"phone icon"}
							layout={"fill"}
						/>
					</div>
					<p className={[pStyle] + " truncate"}>0304-111-0195</p>
				</div>
				{isOpen && (
					<div className="fixed w-1/2 bg-white h-1/6 border-8 inset-0 m-auto z-10">
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
					</div>
				)}
			</div>
		</header>
	)
}
