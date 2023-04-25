import { Application, Assets, Container, Graphics } from "pixi.js";
import { Reel } from "./Reel";
import { randomInitialSymbols, symbolsList } from "../request/symbolList";
import { getSymbolHeight, numberOfReels } from "./consts";

export class ReelsContainer extends Container {
    app: Application;
    symbolsKeys: string[][] = [];
    reels: Reel[] = [];
    symbolHeight: number;
    cheatMode = false;
    constructor(app: Application, cheatMode: boolean) {
        super();
        this.app = app;
        this.symbolHeight = getSymbolHeight(app.screen);
        for (let i = 0; i < numberOfReels; i++) {
            const reel = new Reel(i, app, randomInitialSymbols());
            this.addChild(reel);
            this.reels.push(reel);
        }
        this.cheatMode = cheatMode;
        this.positionContainer();
    }

    public positionContainer() {
        this.sortableChildren = true;
        this.pivot.set(this.width / 2, 0);
        this.position.set(
            this.app.screen.width / 2 + this.symbolHeight / 2,
            this.symbolHeight * 1.75,
        );
    }

    public async addSymbols(reel: Reel) {
        this.symbolsKeys = [];
        const newSymbols = await symbolsList(this.cheatMode);
        reel.addSymbols(newSymbols);
        this.symbolsKeys.push(newSymbols.slice(-3).reverse());
    }

    public winAnimation = () => {
        this.reels.forEach(async (reel, i) => {
            reel.winAnimation();
        });
    };
    public lostAnimation = () => {
        this.reels.forEach(async (reel, i) => {
            reel.lostAnimation();
        });
    };
    public afterSpinning() {
        this.children.forEach((child) => {
            this.removeChild(child);
        });
        this.reels = [];

        for (let i = 0; i < numberOfReels; i++) {
            this.removeChild(this.children[i]);
            const reel = new Reel(i, this.app, this.symbolsKeys[i]);
            this.addChild(reel);
            this.reels.push(reel);
        }
    }
    public checkIfWins = () => {
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
