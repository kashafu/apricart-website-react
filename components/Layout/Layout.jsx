import { createContext, useState } from "react";
import TopBar from "./components/TopBar/TopBar";
import Header from "./components/Header/Header";
import Copyrights from "./components/Footer/Copyrights";
import { useRouter } from "next/router";
import Footer from "./components/Footer/Footer";
export const AppContext = createContext();

export default function Layout(props) {
	const router = useRouter();
	const [appState, setAppState] = useState({ sideDrawerStatus: false });

	const handleAppState = (newState) => {
		setAppState({ ...appState, ...newState });
	}

	return (
		<AppContext.Provider value={{ appState, handleAppState }}>
			<div className="flex flex-col min-h-screen max-w-screen bg-white">
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
				<div className="flex-1 flex flex-col min-h-full min-w-full bg-white px-2 py-2 lg:py-8 lg:my-5">
					<div>{props.children}</div>
				</div>
				{!(
					router.pathname === "/privacy-policy-mobile" ||
					router.pathname === "/terms-of-use-mobile" ||
					router.pathname === "/faqs-mobile"
				) && (
						<div className="mt-auto">
							<Footer />
							<Copyrights />
						</div>
					)}
			</div>
		</AppContext.Provider>
	);
}
