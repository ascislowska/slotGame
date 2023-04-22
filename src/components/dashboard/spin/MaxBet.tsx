import React from "react";
import { useMainStore } from "../../../hooks/useMainStore";
const MaxBet = () => {
    const {
        budget: { changeBetLevel, changeCoinValue },
    } = useMainStore();
    const maxValues = () => {
        changeBetLevel("max");
        changeCoinValue("max");
    };
    return <button onClick={maxValues}>Max Bet</button>;
};

export default MaxBet;
