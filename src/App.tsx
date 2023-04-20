import "./App.css";
import { mainStore, MainStoreContext } from "./stores/mainStore";

import Dashboard from "./components/dashboard/Dashboard";
import PixiGame from "./pixi/PixiGame";
function App() {
    return (
        <MainStoreContext.Provider value={mainStore}>
            <div className="App">
                <PixiGame />
                <Dashboard />
            </div>
        </MainStoreContext.Provider>
    );
}

export default App;
