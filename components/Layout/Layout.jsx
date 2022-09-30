import { useRouter } from "next/router";

import TopBar from "./components/TopBar/TopBar";
import Header from "./components/Header/Header";
import Copyrights from "./components/Footer/Copyrights";
import Footer from "./components/Footer/Footer";

export default function Layout(props) {
	const router = useRouter()

	return (
		<div className="flex flex-col min-h-screen max-w-screen bg-white" id="app">
			{!(
				router.pathname === "/privacy-policy-mobile" ||
				router.pathname === "/terms-of-use-mobile" ||
				router.pathname === "/faqs-mobile"
			) && (
					<div className="mb-2">
						<TopBar />
						<Header />
					</div>
				)}
			<div className="flex-1 min-h-full min-w-full pb-10 px-2">
				{props.children}
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
	);
}
