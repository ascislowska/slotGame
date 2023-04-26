import { Application, Assets, Container, Rectangle, Sprite } from "pixi.js";

export class Background extends Container {
    background: Sprite | null = null;
    screen: Rectangle;
    constructor(app: Application) {
        super();
        this.screen = app.screen;
        this.createBackground(app);
    }
    async createBackground(app: Application) {
        const texture = await Assets.load("night");
        this.background = Sprite.from(texture);
        this.background.anchor.set(0.5, 0);
        this.addChild(this.background);
        this.setPosition(app.screen);
    }
    setPosition(screen: Rectangle) {
        if (this.background) {
            this.background.scale.x =
                Math.max(screen.width, screen.height) / this.background.height;
            this.background.scale.y = this.background.scale.x;
            this.background.x = screen.width / 2;
        }
    }
}
