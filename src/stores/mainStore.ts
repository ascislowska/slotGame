import { Budget } from "./budgetStore";
import { Player } from "./playerStore";
import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class MainStore {
    budget = new Budget();
    player = new Player();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}

export const MainStoreContext = createContext<MainStore | null>(null);
export const mainStore = new MainStore();
