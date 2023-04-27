import { Application, Container } from "pixi.js";
import { Reel } from "./Reel";
import { randomInitialSymbols, symbolsList } from "../request/symbolList";
import { getSymbolHeight, numberOfReels } from "./consts";

export class ReelsContainer extends Container {
    app: Application;
    symbolsKeys: string[][] = [];
    reels: Reel[] = [];
    cheatMode = false;
    constructor(app: Application) {
        super();
        this.app = app;
        for (let i = 0; i < numberOfReels; i++) {
            const reel = new Reel(i, app, randomInitialSymbols());
            this.addChild(reel);
            this.reels.push(reel);
        }
        this.positionContainer();
    }

    public positionContainer() {
        const symbolHeight = getSymbolHeight(this.app.screen);

        this.sortableChildren = true;
        this.pivot.set(this.width / 2, 0);
        this.position.set(
            this.app.screen.width / 2 + symbolHeight / 2,
            symbolHeight * 1.75,
        );
    }

    public async addSymbols(reel: Reel) {
        this.symbolsKeys = [];
        const newSymbols = await symbolsList(this.cheatMode);
        reel.addSymbols(newSymbols);
        this.symbolsKeys.push(newSymbols.slice(-3).reverse());
    }

    public winAnimation = async () => {
        await this.reels.forEach(async (reel) => {
            reel.winAnimation();
        });
    };
    public lostAnimation = async () => {
        await this.reels.forEach((reel) => {
            reel.lostAnimation();
        });
    };
    public afterSpinning() {
        //remove old reels
        for (let i = numberOfReels; i >= 0; i--) {
            this.removeChild(this.children[i]);
        }
        this.reels = [];
        //create new reels with last 3 symbols
        for (let i = 0; i < numberOfReels; i++) {
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
    public onResize() {
        this.positionContainer();
        this.reels.forEach((reel) => {
            reel.onResize();
        });
    }
}
