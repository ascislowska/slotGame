import React from "react";
import { useMainStore } from "../../hooks/useMainStore";
const MaxBet = () => {
    const {
        budget: { changeBetLevel, changeCoinValue },
    } = useMainStore();
    const maxValues = () => {
        changeBetLevel("max");
        changeCoinValue("max");
    };
    return (
        <div className="maxBet-container">
            <a onClick={maxValues} className="btn">
                Max Bet
            </a>
        </div>
    );
};

export default MaxBet;
