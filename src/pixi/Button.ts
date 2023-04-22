import { Application, Sprite, Container, Assets, MIPMAP_MODES } from "pixi.js";
import { getSymbolHeight } from "./consts";

export class Button extends Container {
    onClick: () => void;
    app: Application;
    constructor(onClick: () => void, app: Application) {
        super();
        this.app = app;
        this.addSprite();
        this.btnPosition();
        this.onClick = onClick;
    }
    private async addSprite() {
        const texture = await Assets.load("spin");
        const btn = Sprite.from(texture);
        this.addChild(btn);
        btn.eventMode = "static";
        btn.texture.baseTexture.mipmap = MIPMAP_MODES.ON;

        btn.width = btn.height = getSymbolHeight(this.app.screen) * 1.5;
        // this.pivot.set(this.width / 2, this.height / 2);
        btn.anchor.set(0.5);
        btn.on("pointerdown", this.onClick);
    }
    private btnPosition() {
        this.x = this.app.screen.width / 2;
        this.y = this.app.screen.height * 0.75;
    }
}
