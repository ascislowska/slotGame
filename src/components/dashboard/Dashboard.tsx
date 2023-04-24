import { FC } from "react";
import { observer } from "mobx-react-lite";
import Budget from "./Budget";
import NextBet from "./NextBet";
import Coins from "./Coins";
import InfoBtn from "./InfoBtn";
import MaxBet from "./MaxBet";

const Dashboard: FC = () => {
    return (
        <div className="dashboard-container">
            <InfoBtn />
            <div className="main-panel">
                <NextBet />
                <MaxBet />
                <Coins />
            </div>
            <Budget />
        </div>
    );
};

export default observer(Dashboard);
