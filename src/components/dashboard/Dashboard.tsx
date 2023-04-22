import React from "react";
import { observer } from "mobx-react-lite";
import Budget from "./Budget";
import NextBet from "./NextBet";
import Coins from "./Coins";
import Spin from "./spin/Spin";

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <div className="info-container">
                <div className="info">i</div>{" "}
            </div>

            <div className="main-panel">
                <NextBet />
                <Spin />
                <Coins />
            </div>
            <Budget />
        </div>
    );
};

export default observer(Dashboard);
