import { Container, Application } from "pixi.js";
import { Symbol } from "./Symbol";
import { getSymbolHeight, symbolPadding } from "./consts";

export class Reel extends Container {
    reelIndex: number;
    app: Application;
    symbols: Symbol[] = [];
    initialSymbols: string[] = [];
    constructor(reelIndex: number, app: Application, initialSymbols: string[]) {
        super();
        this.app = app;
        this.reelIndex = reelIndex;
        this.initialSymbols = initialSymbols;

        this.initialSymbols.forEach((element, index) => {
            const symbol = new Symbol(index, element, app);
            this.addChild(symbol);
            this.symbols.push(symbol);
        });

        this.sortableChildren = true;
        this.containerPosition();
    }
    public containerPosition() {
        this.pivot.set(0, 0);
        this.x =
            (getSymbolHeight(this.app.screen) + symbolPadding * 2) *
            this.reelIndex;
        this.y = 0;
    }

    public addSymbols(newKeys: string[]) {
        newKeys.forEach((element, index) => {
            const symbol = new Symbol(-index - 1, element, this.app);
            this.addChild(symbol);
            this.symbols.push(symbol);
        });
    }

    public winAnimation = () => {
        this.symbols[1].win();
    };

    public lostAnimation = () => {
        this.symbols[1].lost();
    };
    public onResize() {
        this.containerPosition();
        this.symbols.forEach((symbol) => symbol.onResize());
    }
}
