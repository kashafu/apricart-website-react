import Image from "next/image"
import Link from "next/link"
import Marquee from "react-fast-marquee"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

// IMAGES
import phonePNG from "../../../../public/assets/images/phone.png"
import logoPNG from "../../../../public/assets/images/logo.png"

export default function TopBar() {
	const router = useRouter()

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
							<Marquee speed={50} className="overflow-hidden">
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
				{/* PHONE NUMBER hidden on phone, shown on desktop*/}
				<div className="hidden space-x-2 items-center lg:inline-flex pl-2 pr-4">
					<div className="relative w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]">
						<Image
							src={phonePNG}
							alt={"phone icon"}
							layout={"fill"}
						/>
					</div>
					<p className="font-nunito font-bold text-sm lg:text-md text-black lg:text-base truncate">
						0304-111-0195
					</p>
				</div>
			</div>
		</header>
	)
}
