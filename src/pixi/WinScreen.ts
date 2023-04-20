import { Application, Container, Sprite } from "pixi.js";

export class WinScreen extends Container {
    app: Application;
    constructor(app: Application) {
        super();
        this.app = app;
        this.drawDolars();
        this.visible = false;
    }
    showScreen() {
        console.log("winScreen");
        this.visible = true;
    }
    drawDolars() {
        //todo: win animation
        for (let i = 0; i < 30; i++) {
            const dolar = Sprite.from("coin");
            dolar.position.set(
                this.app.screen.width * Math.random(),
                this.app.screen.height * Math.random(),
            );
            dolar.scale.set(0.2);
            this.addChild(dolar);
        }
    }
}
