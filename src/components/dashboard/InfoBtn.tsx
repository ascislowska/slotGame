import { useState } from "react";
import { createPortal } from "react-dom";
import Info from "./Info";
const InfoBtn = () => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className="infoBtn-container">
            <a className="btn" onClick={() => setShowInfo(true)}>
                info
            </a>{" "}
            {showInfo &&
                createPortal(
                    <Info onClose={() => setShowInfo(false)} />,
                    document.body,
                )}
        </div>
    );
};

export default InfoBtn;
