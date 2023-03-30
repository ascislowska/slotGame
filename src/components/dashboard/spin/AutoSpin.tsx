import React from "react";
const AutoSpin = () => {
    const multipleSpin = () => {
        console.log("spin");
    };
    return <button onClick={multipleSpin}>AutoSpin x 10</button>;
};

export default AutoSpin;
