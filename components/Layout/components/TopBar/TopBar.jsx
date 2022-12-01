import Image from "next/image"
import Link from "next/link"
import Marquee from "react-fast-marquee"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import Profile from "../Auth/Profile"

// IMAGES
import logoPNG from "../../../../public/assets/images/logo.png"

export default function TopBar() {
	const router = useRouter()

	let { token } = getGeneralApiParams()
	const tickerSelector = useSelector((state) => state.general.ticker)
	const selectedTypeSelector = useSelector((state) => state.general.selectedType)

	return (
		<header className="flex flex-col">
			<div className="flex flex-row w-full bg-main-yellow lg:justify-between px-2 items-center h-[50px]">
				{/* ARPICART LOGO, LOCATION AND SELECTED ADDRESS */}
				<div className="flex flex-row items-center justify-between">
					{/* APRICART LOGO shown on phone, hidden on desktop*/}
					<div className="relative min-w-[100px] w-1/6 lg:hidden">
						<Link href={"/"} passHref>
							<button className="flex">
								<Image
									className=""
									src={logoPNG}
									alt={"logo"}
								/>
							</button>
						</Link>
					</div>
					{/* show TICKER on index page only, otherwise show selectedType */}
					{router.pathname === "/" ? (
						<div className="flex flex-row items-center h-full md:space-x-2">
							<div className="hidden lg:inline items-center bg-main-red px-2 h-2/3">
								<p className="text-white font-roboto font-bold text-xs truncate md:text-lg">
									Latest Update
								</p>
							</div>
							<Marquee speed={50} className="overflow-hidden" gradient={false}>
								<p className="text-center text-sm font-bold text-black">
									{tickerSelector}
								</p>
							</Marquee>
						</div>
					) : (
						<div>
							{selectedTypeSelector == 'bulk' && (
								<p className="text-black font-nunito font-black capitalize">
									Bulk Buy
								</p>
							)}
							{selectedTypeSelector == 'home' && (
								<p className="text-black font-nunito font-black capitalize">
									Home Delivery
								</p>
							)}
							{selectedTypeSelector == 'cnc' && (
								<p className="text-black font-nunito font-black capitalize">
									Click & Collect
								</p>
							)}
						</div>
					)}
				</div>
				{/* LOGIN SIGNUP AND PROFILE */}
				{token ? (
					<div className="flex-col h-full">
						<Profile />
					</div>
				) : (
					<div className="flex flex-row space-x-2 items-center">
						<Link href={"/login"} passHref>
							<a className="font-nunito text-base font-main-grey-800 font-semibold">
								Login
							</a>
						</Link>
						<p className="text-3xl font-bold pb-[5px]">|</p>
						<Link href={"/register"} passHref>
							<a className="truncate text-base font-nunito font-main-grey-800 font-semibold">
								Sign Up
							</a>
						</Link>
					</div>
				)}
			</div>
		</header>
	)
}
