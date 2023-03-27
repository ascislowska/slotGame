import { makeAutoObservable } from "mobx";
import { Change } from "../types";
export class Budget {
    budget: number = 5000;
    coinVal: number = 0.2;
    betLevel = 2;
    win = 0;
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    get coins() {
        return this.budget / this.coinVal;
    }
    get nextBet() {
        return this.betLevel * 15;
    }
    get nextBetVal() {
        return this.betLevel * 15 * this.coinVal;
    }
    get winValue() {
        const prize = this.budget - 5000;
        return prize > 0 ? prize : 0;
    }

    won() {
        this.win = this.nextBet * 100;
        this.budget += this.win * this.coinVal;
    }
    lost() {
        this.budget -= this.nextBetVal;
    }
    changeBetLevel(change: Change) {
        if (change === "increase") {
            this.betLevel += 1;
        } else if (change === "decrease") {
            this.betLevel -= 1;
        }
    }
    changeCoinValue(change: Change) {
        if (change === "increase") {
            this.coinVal += 0.1;
        } else if (change === "decrease") {
            this.coinVal -= 0.1;
        }
    }
}
