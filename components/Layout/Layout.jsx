import React, { createContext, useState } from "react";
import TopBar from "./components/TopBar/TopBar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Copyrights from "./components/Footer/Copyrights";
//I am here

export const AppContext = createContext();

export default function Layout(props) {
    const [appState, setAppState] = useState({ sideDrawerStatus: false });
    const handleAppState = (newState) => {
        setAppState({ ...appState, ...newState });
    };
    return (
        <AppContext.Provider value={{ appState, handleAppState }}>
            <TopBar />
            <div className="container-fluid">
                <Header />
                {props.children}
                <div className="mt-4">
                	<Footer />
				</div>
                <Copyrights />
            </div>
        </AppContext.Provider>
    );
}
