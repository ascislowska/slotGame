import { makeAutoObservable } from "mobx";
import { IReel } from "../types";

export class Reels {
    reelLeft: IReel = { top: "", middle: "", bottom: "" };
    reelMiddle: IReel = { top: "", middle: "", bottom: "" };
    reelRight: IReel = { top: "", middle: "", bottom: "" };
    constructor() {
        makeAutoObservable(this);
        this.randReel(this.reelLeft);
        this.randReel(this.reelMiddle);
        this.randReel(this.reelRight);
    }
    randReel(reel: IReel) {
        function randSymbol() {
            const random = Math.random();
            return random > 0.5 ? "7" : "0";
        }
        reel.top = randSymbol();
        reel.middle = randSymbol();
        reel.bottom = randSymbol();
    }
    // spinReel(reel: IReel) {
    //     function randSymbol() {
    //         const random = Math.random();
    //         return random > 0.5 ? "7" : "0";
    //     }
    // }
}
