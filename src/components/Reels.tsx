import React, { useCallback, useContext } from "react";
import { mainStore, MainStoreContext } from "../stores/mainStore";
import { observer } from "mobx-react-lite";

import Reel from "./Reel";
const Reels = () => {
    useContext(MainStoreContext);
    let { reelLeft, reelMiddle, reelRight, randReel } = mainStore.reels;
    const spin = useCallback(() => {
        console.log("spinning", reelLeft);
        randReel(reelLeft);
        randReel(reelMiddle);
        randReel(reelRight);
    }, [mainStore.reels]);
    return (
        <div>
            <h2>Middle left: {reelLeft.middle}</h2>
            <div className="reels">
                <Reel position="left" />
                <Reel position="middle" />
                <Reel position="right" />
            </div>
            <button onClick={spin}>SPIN</button>
        </div>
    );
};

export default observer(Reels);
