import { useRouter } from "next/router"
// import MapPicker from 'react-google-map-picker'
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import SelectAddress from "../components/Layout/components/Address/SelectAddress"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { useEffect } from "react"
import ProfileNavigationMenu from "../components/Layout/components/Menus/ProfileNavigationMenu"

export default function Address() {
	const router = useRouter()
	let { token } = getGeneralApiParams()

	useEffect(() => {
		if (!token) {
			router.push("/login")
		}
	}, [])

	return (
		<div>
			<HeadTag title={"Address"} />
			<div className="flex flex-col lg:flex-row w-full space-y-6 lg:space-y-0 lg:space-x-4">
				<div className="w-full lg:w-1/5">
					<ProfileNavigationMenu />
				</div>
				<section className="w-full lg:w-4/5">
					<SelectAddress
						type={"manage"}
					/>
				</section>
			</div>
		</div>
	)
}
