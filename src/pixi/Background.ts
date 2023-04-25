import { Application, Assets, Container, Sprite } from "pixi.js";

export class Background extends Container {
    constructor(app: Application) {
        super();
        this.createBackground(app);
        // this.addGlows();
    }
    async createBackground(app: Application) {
        const texture = await Assets.load("night");
        const background = Sprite.from(texture);
        background.anchor.set(0.5, 0);
        this.addChild(background);
        background.scale.x =
            Math.max(app.screen.width, app.screen.height) / background.height;
        background.scale.y = background.scale.x;
        background.x = app.screen.width / 2;
    }

    // private addGlows() {
    //     const lightGlow = Sprite.from("pink-glow");
    //     lightGlow.anchor.set(0.5);
    //     lightGlow.position.set(0, 0);
    //     this.addChild(lightGlow);
    // }
}
