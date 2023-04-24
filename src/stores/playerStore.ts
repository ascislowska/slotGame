import { makeAutoObservable } from "mobx";
import { Currency } from "../types";
export class Player {
    name = "Player";
    currencies: Currency[] = ["€", "$", "PLN"];
    currency: Currency = this.currencies[0];
    coinValue = 0.1;
    language = "english";
    cheatMode = true;

    constructor() {
        makeAutoObservable(this);
    }
    toggleCheatMode = (isOn: boolean) => {
        console.log("cheatmode update", this.cheatMode);
        this.cheatMode = isOn;
    };
}
