import { makeAutoObservable } from "mobx";
import { IBudget } from "../types";
export class Budget implements IBudget {
    credits: number = 0;
    nextBet = 0;
    payout = 0;
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    changeBudget(amount: number) {
        this.credits += amount;
        //todo: write test if credits > 0
    }
    bet(change: "increase" | "decrease") {
        if (change === "increase") {
            this.nextBet += 0.1;
        }
        if (change === "decrease") {
            this.nextBet -= 0.1;
        }
    }
    win(amount: number) {
        this.payout += amount;
    }
}
// export default new Budget();
