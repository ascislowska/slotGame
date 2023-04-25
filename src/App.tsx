import "./styles/App.css";
import { mainStore, MainStoreContext } from "./stores/mainStore";

import Dashboard from "./components/dashboard/Dashboard";
import PixiGame from "./pixi/PixiGame";
import InfoBtn from "./components/dashboard/InfoBtn";
function App() {
    return (
        <MainStoreContext.Provider value={mainStore}>
            <div className="App">
                <PixiGame />
                <InfoBtn />
                <Dashboard />
            </div>
        </MainStoreContext.Provider>
    );
}

export default App;
