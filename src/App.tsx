import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { mainStore, MainStoreContext } from "./stores/mainStore";

import Dashboard from "./components/Dashboard";
import Reels from "./components/Reels";
function App() {
    return (
        <MainStoreContext.Provider value={mainStore}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Reels />
                </header>
                <Dashboard />
            </div>
        </MainStoreContext.Provider>
    );
}

export default App;
