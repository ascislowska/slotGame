import { makeAutoObservable } from "mobx";
export class Reel {
    next: string[] = [];
    top = "";
    middle = "";
    bottom = "";
    spinning = false;

    constructor() {
        makeAutoObservable(this);
        this.randReel();
    }
    randReel() {
        function randSymbol() {
            const random = Math.random();
            return random > 0.5 ? "7" : "0";
        }

        this.top = randSymbol();
        this.middle = randSymbol();
        this.bottom = randSymbol();
    }
    randomNextSymbol() {
        function randSymbol(): string {
            const random = Math.random();
            return random > 0.5 ? "7" : "0";
        }
        for (let i = 0; i < 17; i++) {
            this.next.push(randSymbol());
        }
        this.spinning = true;
    }
    changeSymbols() {
        this.top = this.next[0];
        this.middle = this.next[1];
        this.bottom = this.next[2];
        this.spinning = false;
        this.next = [];
    }
}

export class Reels {}
