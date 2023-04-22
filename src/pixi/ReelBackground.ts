import { Application, Container, Graphics, Rectangle, Sprite } from "pixi.js";
import {
    getSymbolHeight,
    numberOfReels,
    numberOfRows,
    symbolPadding,
} from "./consts";
export class ReelBackground extends Container {
    symbolHeight: number;
    overlay = new Graphics();
    constructor(app: Application) {
        super();
        this.symbolHeight = getSymbolHeight(app.screen);
        this.addOverlay(app);
        this.createBorder();
        this.positionContainer(app);
        this.overlay.y = 1.75 * this.symbolHeight;
        this.overlay.x = 2.125 * this.symbolHeight;
    }
    private addOverlay(app: Application) {
        this.addChild(this.overlay);
        this.overlay.beginFill("rgba(0,0,0,0.5)");
        this.overlay.drawRect(
            0,
            0,
            (this.symbolHeight + symbolPadding) * numberOfReels + symbolPadding,
            (this.symbolHeight + symbolPadding) * numberOfRows + symbolPadding,
        );
        this.overlay.endFill();
        this.overlay.pivot.set(0, 0);
    }
    positionContainer(app: Application) {
        this.pivot.set(this.width / 2 + this.symbolHeight / 2, 0);
        this.y = -this.symbolHeight / 2;
        this.x = app.screen.width / 2 + this.symbolHeight / 2;
    }
    createBorder() {
        const border = Sprite.from("border-neon");
        border.width = this.symbolHeight * (numberOfReels * 2.5);
        border.height = this.symbolHeight * (numberOfRows * 2.25);
        this.addChild(border);
    }
}
