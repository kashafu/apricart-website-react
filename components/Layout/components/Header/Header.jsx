import Link from "next/link"
import { setCookie, getCookie } from "../../../../helpers/Cookies"
import heartIcon from "../../../../public/assets/svgs/heartIcon.svg"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import SearchBar from "../SearchBar/SearchBar"
import HamburgerMenu from "../Menus/HamburgerMenu"
import Logo from "../Logo/Logo"
import Profile from "../Auth/Profile"
import Image from "next/image"
import CartSlider from "../Cart/CartSlider"
import CitySelector from "../Selectors/CitySelector"
import { useState, useEffect } from "react"
import AddressSelector from "../Selectors/AddressSelector"
import { useSelector } from "react-redux"
import PickupLocationSelector from "../Selectors/PickupLocationSelector"

export default function Header() {
	let { token } = getGeneralApiParams()
	const selectedTypeSelector = useSelector(state => state.general.selectedType)
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		if (!getCookie("guestUserId")) {
			const d = new Date()
			setCookie("guestUserId", "desktopuser_" + d.getTime())
		}

		if (!getCookie("selected-type")) {
			setCookie('selected-type', 'home')
		}

		const onScroll = () => setOffset(window.pageYOffset);
		// clean up code
		window.removeEventListener('scroll', onScroll);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [])


	return (
		<div className="flex flex-col py-2 md:py-8 space-y-2 border-b relative h-[45px]">
			<div className={offset >= 20 ? "flex flex-row py-2 transition-all fixed top-0 duration-100 ease-linear z-40 px-2 bg-slate-100 w-full items-center md:py-2" : "flex flex-row py-2 transition-all fixed top-[50px] z-40 px-2 bg-slate-100 w-full items-center md:py-2 duration-300 ease-linear"}>
				<div className="lg:hidden pr-2">
					<HamburgerMenu />
				</div>
				<div className="hidden lg:block lg:w-[200px] px-4">
					<Logo />
				</div>
				<div className="grow">
					<SearchBar />
				</div>
				<div className="lg:hidden px-2 flex flex-row pr-4">
					<CartSlider />
				</div>
				<div className="h-full hidden lg:inline-flex  lg:flex-row lg:space-x-4 lg:items-center">
					<div>
						{selectedTypeSelector === 'cnc' ? (
							<PickupLocationSelector />
						) : (
							<>
								{token ? (
									<AddressSelector />
								) : (
									<CitySelector />
								)}
							</>
						)}
					</div>
					<Link href={"/wishlist"} passHref>
						<a className="flex items-center relative w-[45px] h-[45px]">
							<Image
								src={heartIcon}
								// width={45}
								// height={45}
								layout='fixed'
								alt="wishlist icon"
							/>
						</a>
					</Link>
					<div className="relative">
						<CartSlider />
					</div>
					{token ? (
						<div className="flex-col h-full">
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
		</div>
	)
}
