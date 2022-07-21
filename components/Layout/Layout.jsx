import React, { createContext, useState } from "react";
import TopBar from "./components/TopBar/TopBar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Copyrights from "./components/Footer/Copyrights";
export const AppContext = createContext();

export default function Layout(props) {
    const [appState, setAppState] = useState({ sideDrawerStatus: false });
    const handleAppState = (newState) => {
        setAppState({ ...appState, ...newState });
    };
    return (
        <AppContext.Provider value={{ appState, handleAppState }}>
            <div className="flex flex-col min-h-screen min-w-screen">
                <div>
                    <TopBar />
                    <Header />
                </div>
                <div className="flex-1 min-h-full min-w-full px-2 md:px-8 bg-white">
                {/* <div className="p-4"> */}
                    {props.children}
                </div>
                <div className="mt-auto">
                    <Footer />
                    <Copyrights />
                </div>
            </div>
        </AppContext.Provider>
    );
}
