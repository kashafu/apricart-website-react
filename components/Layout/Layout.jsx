import React, { createContext, useState } from "react";
import TopBar from "./components/TopBar/TopBar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Copyrights from "./components/Footer/Copyrights";
import {useRouter} from "next/router";
import TypeCardSelector from "./components/Cards/TypeCardSelector";
export const AppContext = createContext();

export default function Layout(props) {
    const router = useRouter()
    const [appState, setAppState] = useState({ sideDrawerStatus: false });
    const handleAppState = (newState) => {
        setAppState({ ...appState, ...newState });
    };
    return (
        <AppContext.Provider value={{ appState, handleAppState }}>
            <div className="flex flex-col min-h-screen max-w-screen">
                {!(router.pathname === "/privacy-policy-mobile" || router.pathname === "/terms-of-use-mobile" || router.pathname === "/faqs-mobile") && (
                    <div>
                        <TopBar />
                        <Header />
                        {router.pathname === "/" && (
				<div className="pt-[3rem] lg:pt-[6rem] md:pt-[5rem]  bg-white">
				<TypeCardSelector />
				</div>
			)}
                    </div>
                )}
                <div className="flex-1 min-h-full min-w-full py-2 px-2 md:px-8 bg-white">
                {/* <div className="p-4"> */}
                <div className="pt-[3rem] lg:pt-[7rem] md:pt-[5rem]">
                    {props.children}
                </div>
                </div>
                {!(router.pathname === "/privacy-policy-mobile" || router.pathname === "/terms-of-use-mobile" || router.pathname === "/faqs-mobile") && (
                    <div className="mt-auto">
                        <Footer />
                        <Copyrights />
                    </div>
                )}
                
            </div>
        </AppContext.Provider>
    );
}
