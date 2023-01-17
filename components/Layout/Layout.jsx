import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

import TopBar from "./components/TopBar/TopBar"
import Header from "./components/Header/Header"
import Copyrights from "./components/Footer/Copyrights"
import Footer from "./components/Footer/Footer"
import {
	updateRedirectInformation,
	updateRedirectSource,
} from "../../redux/general.slice"
import { getGeneralApiParams } from "../../helpers/ApiHelpers"
import { useJSRegisterApi } from "../../helpers/Api"

const Layout = (props) => {
	const router = useRouter()
	const dispatch = useDispatch()
	let { token } = getGeneralApiParams()
	const { setData, setIsRegister } = useJSRegisterApi()

	// REDIRECT STUFF
	useEffect(() => {
		if (router.isReady) {
			let queries = router.query
			if (queries.source) {
				dispatch(updateRedirectSource(queries?.source))
			}
			if (queries.name && queries.email && queries.phone_number) {
				dispatch(
					updateRedirectInformation({
						name: queries?.name,
						email: queries?.email,
						phoneNumber: queries?.phone_number,
					})
				)
				if (!token && queries?.source === "js_bank") {
					setData({
						email: queries?.email,
						name: queries?.name,
						phoneNumber: queries?.phone_number,
					})
					setIsRegister(true)
				}
			}
		}
	}, [router.isReady, router.query, token])

	return (
		<div className="flex flex-col justify-between items-stretch min-h-screen max-w-screen bg-white">
			{!(
				router.pathname === "/privacy-policy-mobile" ||
				router.pathname === "/terms-of-use-mobile" ||
				router.pathname === "/faqs-mobile"
			) && (
					<div className="mb-2 animate-dropdown">
						<TopBar />
						<Header />
					</div>
				)}
			<div className="flex flex-col grow items-stretch min-h-full min-w-full pb-10 px-2">
				{props.children}
			</div>
			{!(
				router.pathname === "/privacy-policy-mobile" ||
				router.pathname === "/terms-of-use-mobile" ||
				router.pathname === "/faqs-mobile"
			) && (
					<div className="">
						<Footer />
						<Copyrights />
					</div>
				)}
		</div>
	)
}

export default Layout
