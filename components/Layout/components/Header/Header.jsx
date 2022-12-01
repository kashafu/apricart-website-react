import Link from "next/link"
import Image from "next/image"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

import { setCookie, getCookie } from "../../../../helpers/Cookies"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import SearchBar from "../SearchBar/SearchBar"
import HamburgerMenu from "../Menus/HamburgerMenu"
import Logo from "../Logo/Logo"
import Profile from "../Auth/Profile"
import CartSlider from "../Cart/CartSlider"
import CitySelector from "../Selectors/CitySelector"
import AddressSelector from "../Selectors/AddressSelector"
import PickupLocationSelector from "../Selectors/PickupLocationSelector"
import { getItemLocalStorage, setItemLocalStorage } from "../../../../helpers/Storage"

import heartIcon from "../../../../public/assets/svgs/heartIcon.svg"
import TypeCardSelector from "../Cards/TypeCardSelector"

export default function Header() {
	let { token } = getGeneralApiParams()
	const selectedTypeSelector = useSelector(state => state.general.selectedType)
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		if (!getCookie("guestUserId")) {
			const d = new Date()
			setCookie("guestUserId", "desktopuser_" + d.getTime())
		}

		if (!getItemLocalStorage("selected-type")) {
			setItemLocalStorage('selected-type', 'home')
		}
	}, [token])

	useEffect(() => {
		const onScroll = () => setOffset(window.pageYOffset);
		// clean up code
		window.removeEventListener('scroll', onScroll);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [])


	return (
		<div className="flex flex-col py-2 md:py-8 relative h-[45px]">
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
				<div className="lg:hidden px-2 flex flex-row">
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
					<div className="relative">
						<CartSlider />
					</div>
					<TypeCardSelector />
				</div>
			</div>
		</div>
	)
}
