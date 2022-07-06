import React, { createContext, useState } from "react";
import TopBar from "./components/TopBar/TopBar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Copyrights from "./components/Footer/Copyrights";
//Nothing just check
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
                {/* <div className="p-4 flex-1 min-h-full min-w-full"> */}
                <div className="p-4">
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
