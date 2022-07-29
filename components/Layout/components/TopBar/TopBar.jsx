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

	useEffect(() => {
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

	return (
		<header className="flex flex-col">
			<div className="flex flex-row w-full bg-main-yellow lg:justify-between px-2 lg:px-12 items-center h-[50px]">
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
						<Marquee speed={50} className="overflow-hidden">
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
			</div>
		</header>
	)
}
