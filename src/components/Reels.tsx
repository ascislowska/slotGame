import React, { useCallback, useContext } from "react";
import { mainStore, MainStoreContext } from "../stores/mainStore";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

import Reel from "./Reel";
import { Budget } from "../stores/budgetStore";
const Reels = () => {
    useContext(MainStoreContext);
    let { reelLeft, reelMiddle, reelRight, checkIfWins } = mainStore;

    const spin = () => {
        reelLeft.randomNextSymbol();
        setTimeout(() => {
            reelMiddle.randomNextSymbol();
        }, 100);
        setTimeout(() => {
            reelRight.randomNextSymbol();
        }, 200);

        setTimeout(() => {
            reelLeft.changeSymbols();
            reelMiddle.changeSymbols();
            reelRight.changeSymbols();
            checkIfWins();
        }, 2000);
    };
    return (
        <div>
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
