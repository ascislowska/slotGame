//example https://games.netent.com/video-slots/starburst/
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { mainStore, MainStoreContext } from "./stores/mainStore";

import Dashboard from "./components/dashboard/Dashboard";
import Reels from "./components/Reels";
function App() {
    return (
        <MainStoreContext.Provider value={mainStore}>
            <div className="App">
                <header className="App-header">
                    <Reels />
                </header>
                <Dashboard />
            </div>
        </MainStoreContext.Provider>
    );
}

export default App;
