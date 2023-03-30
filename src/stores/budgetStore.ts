import { makeAutoObservable } from "mobx";
import { Change } from "../types";
export class Budget {
    budget: number = 5000;
    coinValue: number = 0.2;
    maxCoinValue: number = 2;
    betLevel = 2;
    maxBetLevel = 10;
    win = 0;
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    get coins() {
        return this.budget / this.coinValue;
    }
    get nextBet() {
        return this.betLevel * 5;
    }
    get nextBetVal() {
        return this.nextBet * this.coinValue;
    }
    get winValue() {
        const prize = this.budget - 5000;
        return prize > 0 ? prize : 0;
    }
    get isMaxBet(): boolean {
        return this.betLevel >= this.maxBetLevel;
    }
    get isMaxCoinValue(): boolean {
        return this.coinValue >= this.maxCoinValue;
    }
    won() {
        this.win = this.nextBet * 100;
        this.budget += this.win * this.coinValue;
    }
    lost() {
        this.budget -= this.nextBetVal;
    }
    changeBetLevel(change: Change) {
        if (change === "increase") {
            this.betLevel += 1;
        } else if (change === "decrease") {
            this.betLevel -= 1;
        } else if (change === "max") {
            this.betLevel = this.maxBetLevel;
        }
    }
    changeCoinValue(change: Change) {
        if (change === "increase") {
            this.coinValue += 0.1;
        } else if (change === "decrease") {
            this.coinValue -= 0.1;
        } else if (change === "max") {
            this.coinValue = this.maxCoinValue;
        }
    }
}
