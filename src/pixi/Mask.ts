import { Application, Graphics } from "pixi.js";
import { getSymbolHeight } from "./consts";
export class Mask extends Graphics {
    app: Application;
    symbolHeight: number;
    constructor(app: Application) {
        super();
        this.app = app;
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
        this.x = app.screen.width / 2;
    }
    onResize() {
        const symbolHeight = getSymbolHeight(this.app.screen);
        this.y = symbolHeight * 1.25;
        this.height = symbolHeight * 3;
        this.x = this.app.screen.width / 2;
    }
}
