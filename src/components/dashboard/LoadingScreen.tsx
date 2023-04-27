import { useState } from "react";

const LoadingScreen = () => {
    const [visible, setVisible] = useState(true);

    return (
        <div className={`loading-screen ${visible && "isVisible"} `}>
            <h2 className="blue-neon">Neon slot game</h2>
            <a className="btn" onClick={() => setVisible(false)}>
                Play slots
            </a>
        </div>
    );
};

export default LoadingScreen;
