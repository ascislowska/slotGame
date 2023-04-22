import { Application, Graphics } from "pixi.js";
import { getSymbolHeight } from "./consts";
export class Mask extends Graphics {
    symbolHeight: number;
    constructor(app: Application) {
        super();
        this.symbolHeight = getSymbolHeight(app.screen);
        this.createMask(app);
    }
    createMask(app: Application) {
        this.beginFill("black");
        this.drawRect(0, 0, app.screen.width * 5, this.symbolHeight * 3);
        this.endFill();
        app.stage.addChild(this);
        this.mask = this;

        this.pivot.set(this.width / 2, 0);
        this.y = this.symbolHeight * 1.25;
        // this.y = app.screen.height / 2 - this.symbolHeight / 2;
        this.x = app.screen.width / 2;
    }
}
