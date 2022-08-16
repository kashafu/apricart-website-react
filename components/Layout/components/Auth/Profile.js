import Link from "next/link"
import { useState } from "react"
import {
	getGeneralCookies,
	logOutRemoveCookies,
} from "../../../../helpers/ApiHelpers"
import LinkText from "../Typography/LinkText"
import SubmitButton from "../Buttons/SubmitButton"
import { useRouter } from "next/router"

export default function Profile() {
	const router = useRouter()

	let { name } = getGeneralCookies()
	const [showDropdown, setShowDropdown] = useState(false)

	const logout = () => {
		logOutRemoveCookies()
		router.push("/")
	}

	return (
		<div
			className="relative h-[45px] flex items-center"
			onMouseEnter={() => {
				setShowDropdown(true)
			}}
			onMouseLeave={() => {
				setShowDropdown(false)
			}}
		>
			<Link href={"/profile_user"} passHref>
				<a className="flex flex-row w-full items-center whitespace-nowrap space-x-px font-lato text-main-blue font-semibold">
					<p className="capitalize">Welcome, {name}</p>
				</a>
			</Link>
			<div
				className={
					"flex flex-col items-center absolute right-0 top-[45px] z-10 w-[200px] p-4 bg-slate-100 rounded-b-xl space-y-6 " + [showDropdown ? "animate-dropdown transition-none" : "opacity-0 duration-200 delay-1000 invisible"]
				}
			>
				<div className="flex flex-col items-center space-y-4">
					<LinkText text={"My Profile"} path={"/profile_user"} />
					<LinkText text={"My Orders"} path={"/order"} />
					<LinkText text={"My Addresses"} path={"/address"} />
				</div>
				<SubmitButton text={"LOGOUT"} onClick={logout} bgColor={"bg-red-600"} />
			</div>
		</div>
	)
}
