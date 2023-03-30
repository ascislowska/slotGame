import React from "react";
import { useMainStore } from "../../../hooks/useMainStore";
const SpinBtn: React.FC = () => {
    const { reelLeft, reelMiddle, reelRight, checkIfWins } = useMainStore();
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
            <button onClick={spin} className="spin-btn">
                SPIN
            </button>
        </div>
    );
};

export default SpinBtn;
