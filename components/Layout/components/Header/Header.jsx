import Link from "next/link"
import Cookies from "universal-cookie"
import heartIcon from "../../../../public/assets/svgs/heartIcon.svg"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import SearchBar from "../SearchBar/SearchBar"
import HamburgerMenu from "../Menus/HamburgerMenu"
import Logo from "../Logo/Logo"
import Profile from "../Auth/Profile"
import Image from "next/image"
import HomeDeliveryCard from "../Cards/HomeDeliveryCard"
import ClickAndCollectCard from "../Cards/ClickAndCollectCard"
import BulkBuyCard from "../Cards/BulkBuyCard"
import CartSlider from "../Cart/CartSlider"
import { useRouter } from "next/router"
import CitySelector from "../CitySelector/CitySelector"

export default function Header() {
	const cookies = new Cookies()
	const router = useRouter()

	let { token } = getGeneralApiParams()

	if (!cookies.get("guestUserId")) {
		const d = new Date()
		cookies.set("guestUserId", "desktopuser_" + d.getTime(), 30)
	}

	return (
		<div className="flex flex-col bg-white px-2 md:px-12 py-2 md:py-8 space-y-2 border-b">
			<div className="flex flex-row items-center space-x-2 md:space-x-4">
				<div className="lg:hidden">
					<HamburgerMenu />
				</div>
				<div className="hidden lg:block lg:w-[200px]">
					<Logo />
				</div>
				<div className="grow">
					<SearchBar />
				</div>
				<div className="lg:hidden flex flex-row pr-4">
					<CartSlider />
				</div>
				<div className="hidden lg:inline lg:flex lg:flex-row lg:space-x-4 lg:items-center">
					<div>
						<CitySelector />
					</div>
					<Link href={"/wishlist"} passHref>
						<a className="flex items-center">
							<Image
								src={heartIcon}
								width={45}
								height={45}
								alt="wishlist icon"
							/>
						</a>
					</Link>
					<div className="relative">
						<CartSlider />
					</div>
					{token ? (
						<div>
							<Profile />
						</div>
					) : (
						<div className="flex flex-row space-x-2 items-center">
							<Link href={"/login"} passHref>
								<a className="text-xl font-main-grey-800 font-semibold">
									Login
								</a>
							</Link>
							<p className="text-3xl font-bold pb-[5px]">|</p>
							<Link href={"/register"} passHref>
								<a className="truncate text-xl font-main-grey-800 font-semibold">
									Sign Up
								</a>
							</Link>
						</div>
					)}
				</div>
			</div>
			{router.pathname === "/" && (
				<div className="grid grid-cols-3 lg:gap-12 lg:px-28 gap-2">
					<HomeDeliveryCard />
					<ClickAndCollectCard />
					<BulkBuyCard />
				</div>
			)}
		</div>
	)
}
