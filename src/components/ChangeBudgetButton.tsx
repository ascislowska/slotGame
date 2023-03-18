import React, { useContext } from "react";
import { mainStore, MainStoreContext } from "../stores/mainStore";

const ChangeBudgetButton: React.FC<{ amount: number }> = ({ amount }) => {
    useContext(MainStoreContext);
    const { currency } = mainStore.player;
    const { changeBudget } = mainStore.budget;
    return (
        <button
            className="dashboard-buttons"
            onClick={() => changeBudget(amount)}
        >
            {`${amount > 0 ? "+" : ""}${amount}${currency}`}
        </button>
    );
};

export default ChangeBudgetButton;
