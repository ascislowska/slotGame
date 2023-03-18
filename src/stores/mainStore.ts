import { Budget } from "./budgetStore";
import { Player } from "./playerStore";
import { Reels } from "./reelStore";
import React, { createContext } from "react";

class MainStore {
    budget = new Budget();
    player = new Player();
    reels = new Reels();
    constructor() {}
}

export const MainStoreContext = createContext<MainStore | null>(null);
export const mainStore = new MainStore();
