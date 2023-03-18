import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { mainStore, MainStoreContext } from "../stores/mainStore";

import ChangeBudgetButton from "./ChangeBudgetButton";
import ChangeBetButton from "./ChangeBetButton";

const Dashboard: React.FC = () => {
    useContext(MainStoreContext);
    const {
        budget: { credits, nextBet },
        player: { name, currency },
    } = mainStore;
    return (
        <div>
            <h2>{`Hello ${name}! Wanna be reach?`}</h2>
            <ChangeBudgetButton amount={-10} />
            <p>
                Total budget: {credits}
                {currency}
            </p>
            <ChangeBudgetButton amount={10} />
            <div className="bet-container">
                <ChangeBetButton change="decrease">-</ChangeBetButton>
                BET: {nextBet.toFixed(1)}
                <ChangeBetButton change="increase">+</ChangeBetButton>
            </div>
        </div>
    );
};

export default observer(Dashboard);
