import { Application, Container, Sprite, MIPMAP_MODES } from "pixi.js";
import { gsap } from "gsap";
import { getSymbolHeight } from "./consts";

export class Symbol extends Container {
    symbolHeight: number;
    constructor(index: number, symbolKey: string, app: Application) {
        super();
        this.symbolHeight = getSymbolHeight(app.screen);
        const symbol = Sprite.from(symbolKey);

        symbol.width = symbol.height = this.symbolHeight;
        symbol.texture.baseTexture.mipmap = MIPMAP_MODES.ON;
        this.addChild(symbol);
        symbol.anchor.set(0.5, 0.5);
        symbol.y = index * this.symbolHeight;
    }

    rotate() {
        //to do
        gsap.to(this.children, {
            rotation: Math.PI,
            duration: 1,
            repeat: 1,
        });
    }
}
