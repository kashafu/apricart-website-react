import { createContext, useState } from "react";
import TopBar from "./components/TopBar/TopBar";
import Header from "./components/Header/Header";
import Copyrights from "./components/Footer/Copyrights";
import { useRouter } from "next/router";
import FooterSleek from "./components/Footer/FooterSleek";
import { getGeneralApiParams } from "../../helpers/ApiHelpers";
import { toast } from 'react-toastify'
export const AppContext = createContext();

export default function Layout(props) {
	const router = useRouter();
	const [appState, setAppState] = useState({ sideDrawerStatus: false });
	const { token, selectedAddress } = getGeneralApiParams()

	const handleAppState = (newState) => {
		setAppState({ ...appState, ...newState });
	};

	// if (token && !selectedAddress) {
	// 	toast.warn("Please select your delivery address")
	// 	console.log("Please select your delivery address")
	// }

	return (
		<AppContext.Provider value={{ appState, handleAppState }}>
			<div className="flex flex-col min-h-screen max-w-screen">
				{!(
					router.pathname === "/privacy-policy-mobile" ||
					router.pathname === "/terms-of-use-mobile" ||
					router.pathname === "/faqs-mobile"
				) && (
						<div>
							<TopBar />
							<Header />
						</div>
					)}
				<div className="flex-1 min-h-full min-w-full pt-2 pb-10 px-2 md:px-8 bg-white">
					<div className="pt-[3rem] lg:pt-[5rem]">{props.children}</div>
				</div>
				{!(
					router.pathname === "/privacy-policy-mobile" ||
					router.pathname === "/terms-of-use-mobile" ||
					router.pathname === "/faqs-mobile"
				) && (
						<div className="mt-auto">
							<FooterSleek />
							<Copyrights />
						</div>
					)}
			</div>
		</AppContext.Provider>
	);
}
