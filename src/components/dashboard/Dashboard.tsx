import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { mainStore, MainStoreContext } from "../../stores/mainStore";
import Budget from "./budget/Budget";
import ChangeButton from "./ChangeButton";

const Dashboard: React.FC = () => {
    useContext(MainStoreContext);
    const {
        budget: {
            coins,
            nextBet,
            betLevel,
            coinVal,
            changeBetLevel,
            changeCoinValue,
        },
        player: { name, currency },
        reelLeft,
        checkIfWins,
    } = mainStore;

    return (
        <div>
            <h2>{`Hello ${name}! Wanna be reach?`}</h2>
            <div className="mainPanel">
                <div>info</div>
                <div>Next bet: {nextBet}</div>
                <div>
                    Level:
                    <div>
                        <ChangeButton
                            change="decrease"
                            onClick={() => changeBetLevel("decrease")}
                        />
                        {betLevel}
                        <ChangeButton
                            change="increase"
                            onClick={() => changeBetLevel("increase")}
                        />
                    </div>
                </div>
                <div>
                    Coin value:{" "}
                    <div>
                        <ChangeButton
                            change="decrease"
                            onClick={() => changeCoinValue("decrease")}
                        />
                        {coinVal.toFixed(1)}
                        <ChangeButton
                            change="increase"
                            onClick={() => changeCoinValue("increase")}
                        />
                    </div>
                </div>
                <div>Coins: {coins.toFixed(0)}</div>
            </div>
            <Budget />
        </div>
    );
};

export default observer(Dashboard);
