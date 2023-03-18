import React, { useContext } from "react";
import { mainStore, MainStoreContext } from "../stores/mainStore";
import { Budget } from "../stores/budgetStore";
import { Change } from "../types";
type ChangeBetButtonProps = {
    children: React.ReactNode;
    change: Change;
};
const ChangeBetButton: React.FC<ChangeBetButtonProps> = ({
    children,
    change,
}) => {
    useContext(MainStoreContext);
    const { bet } = mainStore.budget;

    return (
        <button className="dashboard-buttons" onClick={() => bet("increase")}>
            {children}
        </button>
    );
};

export default ChangeBetButton;
