import React, { useCallback, useContext } from "react";
import { mainStore, MainStoreContext } from "../stores/mainStore";
import { observer } from "mobx-react-lite";
import { IReel } from "../types";
interface ReelProps {
    position: "left" | "middle" | "right";
}
const Reel = observer(({ position }: ReelProps) => {
    useContext(MainStoreContext);
    const reel = (): IReel => {
        switch (position) {
            case "left":
                return mainStore.reelLeft;
            case "middle":
                return mainStore.reelMiddle;
            case "right":
                return mainStore.reelRight;
        }
    };
    const { next, top, middle, bottom, spinning }: IReel = reel();

    return (
        <div className={`reel ${spinning && "spinning"}`}>
            {next.map((symbol, index) => (
                <div className="symbol next" key={index}>
                    {symbol}
                </div>
            ))}
            <div className="symbol">{top}</div>
            <div className="symbol">{middle}</div>
            <div className="symbol">{bottom}</div>
        </div>
    );
});

export default Reel;
