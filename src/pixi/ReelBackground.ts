import { Application, Container, Graphics, Sprite } from "pixi.js";
import {
    getSymbolHeight,
    numberOfReels,
    numberOfRows,
    symbolPadding,
} from "./consts";
export class ReelBackground extends Container {
    app: Application;
    border: Sprite;
    overlay = new Graphics();
    constructor(app: Application) {
        super();
        this.app = app;

        const symbolHeight = getSymbolHeight(this.app.screen);
        this.addOverlay(symbolHeight);
        this.border = Sprite.from("border-neon");
        this.addChild(this.border);

        this.borderSize(symbolHeight);
        this.positionContainer(symbolHeight);
        this.postionOverlay(symbolHeight);
    }

    positionContainer(symbolHeight: number) {
        this.pivot.set(this.width / 2 + symbolHeight / 2, 0);
        this.y = -symbolHeight / 2;
        this.x = this.app.screen.width / 2 + symbolHeight / 2;
    }

    borderSize = (symbolHeight: number) => {
        this.border.width = symbolHeight * (numberOfReels * 2.5);
        this.border.height = symbolHeight * (numberOfRows * 2.25);
    };

    private addOverlay(symbolHeight: number) {
        this.addChild(this.overlay);
        this.overlay.beginFill("rgba(0,0,0,0.5)");
        this.overlay.drawRect(
            0,
            0,
            this.getOverlayWidth(symbolHeight),
            this.getOverlayHeight(symbolHeight),
        );
        this.overlay.endFill();
        this.overlay.pivot.set(0, 0);
    }
    private getOverlayWidth(symbolHeight: number) {
        return (symbolHeight + symbolPadding) * numberOfReels + symbolPadding;
    }
    private getOverlayHeight(symbolHeight: number) {
        return (symbolHeight + symbolPadding) * numberOfRows + symbolPadding;
    }
    private postionOverlay(symbolHeight: number) {
        this.overlay.y = 1.75 * symbolHeight;
        this.overlay.x = 2.125 * symbolHeight;
    }
    public onResize(app: Application) {
        const symbolHeight = getSymbolHeight(app.screen);

        this.borderSize(symbolHeight);

        this.positionContainer(symbolHeight);
        this.overlay.width = this.getOverlayWidth(symbolHeight);
        this.overlay.height = this.getOverlayHeight(symbolHeight);
        this.postionOverlay(symbolHeight);
    }
}
