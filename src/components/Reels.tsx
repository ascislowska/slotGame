import React from "react";
import { observer } from "mobx-react-lite";

import Reel from "./Reel";
const Reels: React.FC = () => {
    return (
        <div>
            <div className="reels">
                <Reel position="left" />
                <Reel position="middle" />
                <Reel position="right" />
            </div>
        </div>
    );
};

export default observer(Reels);
