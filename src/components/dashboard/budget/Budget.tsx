import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { MainStoreContext, mainStore } from "../../../stores/mainStore";
const Budget = observer(() => {
    useContext(MainStoreContext);
    const {
        budget: { budget, nextBetVal, winValue },
        player: { currency },
    } = mainStore;

    return (
        <div className="budget">
            <div>
                Total budget: {budget}
                {currency}
            </div>
            <div>
                Bet: {nextBetVal} {currency}
            </div>
            <div>
                Win: {winValue} {currency}
            </div>
        </div>
    );
});
export default Budget;
