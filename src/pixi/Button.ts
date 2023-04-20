import { Application, Sprite, Container, Assets } from "pixi.js";

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
        btn.scale.set(0.2);
        // this.pivot.set(this.width / 2, this.height / 2);
        btn.anchor.set(0.5);
        btn.on("pointerdown", this.onClick);
    }
    private btnPosition() {
        this.x = this.app.screen.width / 2;
        this.y = (this.app.screen.height / 5) * 3.5;
    }
}
