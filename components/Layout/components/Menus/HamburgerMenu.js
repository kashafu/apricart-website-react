import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"
import menuIcon from "../../../../public/assets/svgs/menuIcon.svg"
import crossIcon from "../../../../public/assets/svgs/cross2Icon.svg"
import profileIcon from "../../../../public/assets/svgs/profileIcon.svg"
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

export default function HamburgerMenu() {
	const router = useRouter()

	let { token } = getGeneralApiParams()
	let { name, email, phoneNumber } = getGeneralCookies()
	const [showMenu, setShowMenu] = useState(false)

	const logout = () => {
		logOutRemoveCookies()
		router.push("/")
		// router.reload()
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
				<div className="w-full h-full">
					<div className="fixed top-0 flex flex-col py-4 px-2 left-0 w-3/4 h-full bg-white z-50 justify-between rounded-r-2xl">
						<div className="space-y-4">
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
							<div className="items-center align-center space-y-2">
								<div className="py-2" onClick={() => {
									setShowMenu(!showMenu)
								}}>
									{token ? (
										<AddressSelector />
									) : (
										<CitySelector />)
									}
								</div>
								<LinkButton
									text={"View Categories"}
									path={"/category"}
									onClick={() => {
										setShowMenu(!showMenu)
									}}
								/>
								<LinkButton
									text={"Shopping List"}
									path={"/wishlist"}
									onClick={() => {
										setShowMenu(!showMenu)
									}}
								/>
								<LinkButton
									text={"Order Manually"}
									path={token ? "/grocery_list" : "/login"}
									onClick={() => {
										setShowMenu(!showMenu)
									}}
								/>
							</div>
						</div>
						{token ? (
							<div className="flex flex-col space-y-2">
								{/* <div className="flex flex-row">
                                        <Image
                                            src={profileIcon}
                                            alt={'icon'}
                                            height={20}
                                            width={20}
                                        />
                                        <div className="flex flex-col">
                                            <p>
                                                {name}
                                            </p>
                                            <p>
                                                {email}
                                            </p>
                                            <p>
                                                {phoneNumber}
                                            </p>
                                        </div>
                                    </div> */}
								<SubmitButton
									text={"ACCOUNT"}
									onClick={() => {
										setShowMenu(!showMenu)
										router.push("/profile")
									}}
								/>
								<SubmitButton
									text={"ADDRESSES"}
									onClick={() => {
										setShowMenu(!showMenu)
										router.push("/address")
									}}
								/>
								<SubmitButton
									text={"ORDERS"}
									onClick={() => {
										setShowMenu(!showMenu)
										router.push("/order")
									}}
								/>
								<SubmitButton
									text={"ADDRESS"}
									onClick={() => {
										setShowMenu(!showMenu)
										router.push("/address")
									}}
								/>
								<SubmitButton
									bgColor={'bg-red-600'}
									text={"LOGOUT"}
									onClick={() => {
										logout()
										setShowMenu(!showMenu)
									}}
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
