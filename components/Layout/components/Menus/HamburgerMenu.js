import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import menuIcon from "../../../../public/assets/svgs/menuIcon.svg"
import crossIcon from "../../../../public/assets/svgs/cross2Icon.svg"
import profileIcon from "../../../../public/assets/svgs/profileIcon.svg"
import categoriesIcon from "../../../../public/assets/svgs/categoriesIcon.svg"
import myOrdersIcon from "../../../../public/assets/svgs/myOrdersIcon.svg"
import shoppingListIcon from "../../../../public/assets/svgs/shoppingListIcon.svg"
import locationPinBlueIcon from "../../../../public/assets/svgs/locationPinBlueIcon.svg"
import logoutIcon from "../../../../public/assets/svgs/logoutIcon.svg"

import Logo from "../Logo/Logo"
import {
	getGeneralApiParams,
	logOutRemoveCookies,
	getGeneralCookies,
} from "../../../../helpers/ApiHelpers"
import SubmitButton from "../Buttons/SubmitButton"
import LinkButton from "../Buttons/LinkButton"
import CitySelector from "../Selectors/CitySelector"
import AddressSelector from "../Selectors/AddressSelector"
import PickupLocationSelector from "../Selectors/PickupLocationSelector"

export default function HamburgerMenu() {
	const router = useRouter()
	const selectedTypeSelector = useSelector(state => state.general.selectedType)

	let { token } = getGeneralApiParams()
	let { name } = getGeneralCookies()
	const [showMenu, setShowMenu] = useState(false)

	const logout = () => {
		logOutRemoveCookies()
		router.push("/")
	}

	return (
		<div className="relative">
			<button
				className="flex items-center"
				onClick={() => {
					setShowMenu(!showMenu)
				}}
			>
				<Image src={menuIcon} alt={"icon"} width={25} height={20} />
			</button>
			{showMenu && (
				<div className="w-full h-full animate-fade-in">
					<div className="fixed top-0 flex flex-col py-4 px-2 left-0 w-3/4 h-full bg-white z-50 justify-between rounded-r-2xl">
						<div className="space-y-4 w-full">
							<div className="flex flex-row justify-between items-center">
								<div className="w-1/2">
									<Logo />
								</div>
								<button
									onClick={() => {
										setShowMenu(!showMenu)
									}}
								>
									<Image
										src={crossIcon}
										alt={"cross icon"}
										width={20}
										height={20}
									/>
								</button>
							</div>
							{token && (
								<p className="text-main-blue font-bold text-lg capitalize">
									Welcome, {name}
								</p>
							)}
							<div className="py-2 w-full">
								{selectedTypeSelector === 'cnc' ? (
									<PickupLocationSelector />
								) : (
									<>
										{token ? (
											<div
												className="w-full"
												onClick={() => {
													setShowMenu(!showMenu)
												}}>
												<AddressSelector />
											</div>
										) : (
											<CitySelector />
										)}
									</>
								)}

							</div>
							<div className="flex flex-col items-center justify-center align-center space-y-2 w-2/3">
								<LinkButton
									text={"View Categories"}
									path={"/category"}
									onClick={() => {
										setShowMenu(!showMenu)
									}}
									icon={categoriesIcon}
									height={'20px'}
									width={'20px'}
								/>
								{token && (
									<>
										<LinkButton
											text={"Account"}
											path={"/profile"}
											onClick={() => {
												setShowMenu(!showMenu)
											}}
											icon={profileIcon}
											height={'20px'}
											width={'20px'}
										/>
										<LinkButton
											text={"My Orders"}
											path={"/order"}
											onClick={() => {
												setShowMenu(!showMenu)
											}}
											icon={myOrdersIcon}
											height={'20px'}
											width={'20px'}
										/>
										<LinkButton
											text={"My Addresses"}
											path={"/address"}
											onClick={() => {
												setShowMenu(!showMenu)
											}}
											icon={locationPinBlueIcon}
											height={'20px'}
											width={'20px'}
										/>
									</>
								)}
								<LinkButton
									text={"Shopping List"}
									path={"/wishlist"}
									onClick={() => {
										setShowMenu(!showMenu)
									}}
									icon={shoppingListIcon}
									height={'20px'}
									width={'20px'}
								/>
							</div>
						</div>
						{token ? (
							<div className="flex flex-col space-y-2">
								<SubmitButton
									bgColor={'bg-red-600'}
									text={"LOGOUT"}
									onClick={() => {
										logout()
										setShowMenu(!showMenu)
									}}
									icon={logoutIcon}
									height={'20px'}
									width={'20px'}
								/>
							</div>
						) : (
							<div className="space-y-2">
								<SubmitButton
									text={"LOGIN"}
									onClick={() => {
										setShowMenu(!showMenu)
										router.push("/login")
									}}
								/>
								<SubmitButton
									text={"REGISTER"}
									onClick={() => {
										setShowMenu(!showMenu)
										router.push("/register")
									}}
								/>
							</div>
						)}
					</div>
					{/* BACKDROP */}
					<div
						className="fixed top-0 right-0 h-screen w-1/4 z-50"
						onClick={() => {
							setShowMenu(!showMenu)
						}}
					></div>
				</div>
			)}
		</div>
	)
}
