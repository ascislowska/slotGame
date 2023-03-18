import React, { useCallback, useContext } from "react";
import { mainStore, MainStoreContext } from "../stores/mainStore";
import { observer } from "mobx-react-lite";
import { IReel } from "../types";
interface ReelProps {
    position: "left" | "middle" | "right";
}
const Reel = observer(({ position }: ReelProps) => {
    useContext(MainStoreContext);
    console.log("Reel rerrenders");
    const reel = (): IReel => {
        switch (position) {
            case "left":
                return mainStore.reels.reelLeft;
            case "middle":
                return mainStore.reels.reelMiddle;
            case "right":
                return mainStore.reels.reelRight;
        }
    };
    const { top, middle, bottom }: IReel = reel();
    return (
        <div className="reel">
            <div className="symbol">{top}</div>
            <div className="symbol">{middle}</div>
            <div className="symbol">{bottom}</div>
        </div>
    );
});

export default Reel;
