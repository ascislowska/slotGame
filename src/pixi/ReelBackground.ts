import { Application, Container, Graphics, Sprite } from "pixi.js";
import { getSymbolHeight, numberOfReels, symbolPadding } from "./consts";
export class ReelBackground extends Container {
    symbolHeight: number;
    constructor(app: Application) {
        super();
        this.symbolHeight = getSymbolHeight(app.screen);

        this.createBorder();
        this.positionContainer(app);
    }

    positionContainer(app: Application) {
        this.pivot.set(this.width / 2 + this.symbolHeight / 2, this.height);
        this.y = app.screen.height / 2;
        this.x = app.screen.width / 2;
    }
    createBorder() {
        const border = Sprite.from("border");
        border.width = this.symbolHeight * (numberOfReels + 2);
        border.height = this.symbolHeight * (numberOfReels + 1);
        this.addChild(border);
    }
}
