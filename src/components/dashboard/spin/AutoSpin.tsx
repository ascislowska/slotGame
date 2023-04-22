import React from "react";
const AutoSpin = () => {
    const multipleSpin = () => {
        console.log("spin");
    };
    return <button onClick={multipleSpin}>Auto Spin</button>;
};

export default AutoSpin;
