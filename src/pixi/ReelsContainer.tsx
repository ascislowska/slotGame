import { Application, Container } from "pixi.js";
import { Reel } from "./Reel";
import { randomInitialSymbols, symbolsList } from "../request/symbolList";

export class ReelsContainer extends Container {
    app: Application;
    symbolsKeys: string[][] = [];
    reels: Reel[] = [];
    constructor(app: Application) {
        super();
        this.app = app;
        for (let i = 0; i < 3; i++) {
            const reel = new Reel(i, app, randomInitialSymbols());
            this.addChild(reel);
        }
        this.positionContainer();
    }

    public positionContainer() {
        this.sortableChildren = true;
        this.pivot.set(this.width / 2, this.height);
        this.position.set(
            this.app.screen.width / 2,
            this.app.screen.height / 2,
        );
    }
    public async addSymbols(reel: Reel) {
        this.symbolsKeys = [];
        const newSymbols = await symbolsList();
        reel.addSymbols(newSymbols);
        this.symbolsKeys.push(newSymbols.slice(-3).reverse());
    }

    public stopSpinning = () => {
        this.reels.forEach((reel) => reel.afterSpinning());
        this.children.forEach((child) => {
            this.removeChild(child);
        });
        for (let i = 0; i < 3; i++) {
            this.removeChild(this.children[i]);
            const reel = new Reel(i, this.app, this.symbolsKeys[i]);
            this.addChild(reel);
        }
    };
    public checkIfWins = () => {
        console.log(this.symbolsKeys);
        if (this.symbolsKeys.length >= 3 && this.middleLine()) {
            return true;
        }
    };
    private middleLine = () => {
        return this.symbolsKeys
            .map((column) => column[1])
            .every((symbol) => symbol === this.symbolsKeys[0][1]);
    };
}
