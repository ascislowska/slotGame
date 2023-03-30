import React from "react";
import AutoSpin from "./AutoSpin";
import MaxBet from "./MaxBet";
import SpinBtn from "./SpinBtn";
const Spin = () => {
    return (
        <div className="spin-btn-container">
            <AutoSpin />
            <SpinBtn />
            <MaxBet />
        </div>
    );
};

export default Spin;
