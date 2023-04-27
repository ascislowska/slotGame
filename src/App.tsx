import "./styles/App.css";
import { mainStore, MainStoreContext } from "./stores/mainStore";

import Dashboard from "./components/dashboard/Dashboard";
import PixiGame from "./pixi/PixiGame";
import InfoBtn from "./components/dashboard/InfoBtn";
import LoadingScreen from "./components/dashboard/LoadingScreen";
function App() {
    return (
        <MainStoreContext.Provider value={mainStore}>
            <div className="App">
                <LoadingScreen />
                <PixiGame />
                <InfoBtn />
                <Dashboard />
            </div>
        </MainStoreContext.Provider>
    );
}

export default App;
