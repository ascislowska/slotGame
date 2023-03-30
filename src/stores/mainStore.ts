import { Budget } from "./budgetStore";
import { Player } from "./playerStore";
import { Reel } from "./reelStore";
import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class MainStore {
    budget = new Budget();
    player = new Player();
    reelLeft = new Reel();
    reelMiddle = new Reel();
    reelRight = new Reel();
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    checkIfWins() {
        if (
            this.reelLeft.middle === this.reelMiddle.middle &&
            this.reelMiddle.middle === this.reelRight.middle
        ) {
            this.budget.won();
        } else {
            this.budget.lost();
        }
    }
}

export const MainStoreContext = createContext<MainStore | null>(null);
export const mainStore = new MainStore();
