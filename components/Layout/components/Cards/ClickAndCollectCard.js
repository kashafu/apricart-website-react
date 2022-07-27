import Image from "next/image"
import Link from "next/link"
import clickAndCollectIcon from "../../../../public/assets/svgs/clickAndCollectIcon.svg"
import { useState } from "react"
import Popup from "../Popup/Popup"
import playstoreImg from "../../../../public/assets/images/playstore-img.png"
import appstoreImg from "../../../../public/assets/images/appstore-img.png"

export default function ClickAndCollectCard() {
	const [showPopup, setShowPopup] = useState(false)

	return (
		<button
			className="relative bg-white rounded-lg shadow flex flex-col grow p-2 items-center"
			onClick={() => {
				setShowPopup(!showPopup)
			}}
		>
			<div className="hidden absolute self-start font-bold text-main-blue lg:inline text-2xl xl:text-3xl 2xl:text-4xl">
				<p>CLICK & COLLECT</p>
			</div>
			<div className="self-end mt-auto relative w-full lg:pt-2">
				<Image
					src={clickAndCollectIcon}
					layout={"responsive"}
					alt="click and collect"
				/>
			</div>
			<div className="lg:hidden flex font-semibold text-main-blue text-xs">
				<p>Click & Collect</p>
			</div>
			{showPopup && (
				<Popup
					content={
						<div className="flex flex-col h-full">
							<div className="mt-auto mb-auto flex flex-col space-y-4">
								<p className="text-main-blue text-sm lg:text-2xl font-bold">
									Click from Home and Collect at Store!
								</p>
								<p className="text-main-blue text-xs lg:text-xl font-bold">
									Use our APP to place your Click & Collect
									order.
								</p>
								<div className="flex flex-row w-full justify-center">
									<Link
										href={
											"https://play.google.com/store/apps/details?id=com.assorttech.airoso_app&hl=en&gl=US"
										}
										passHref
									>
										<a>
											<Image
												src={playstoreImg}
												width={120}
												height={40}
												alt=""
											/>
										</a>
									</Link>
									<Link
										href={
											"https://apps.apple.com/us/app/apricart/id1562353936?platform=iphone"
										}
										passHref
									>
										<a>
											<Image
												src={appstoreImg}
												width={120}
												height={40}
												alt=""
											/>
										</a>
									</Link>
								</div>
							</div>
						</div>
					}
					handleClose={() => {
						setShowPopup(!showPopup)
					}}
				/>
			)}
		</button>
	)
}
