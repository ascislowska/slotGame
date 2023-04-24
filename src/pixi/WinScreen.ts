import { Application, Assets, Container, DisplayObject, Sprite } from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI({
    DisplayObject: DisplayObject,
    Application,
    Container,
    Sprite,
});

export class WinScreen extends Container {
    app: Application;
    lightGlows: Sprite[] = [];

    constructor(app: Application) {
        super();
        this.app = app;
        this.visible = false;
        this.drawGlows();
    }
    showScreen() {
        console.log("winScreen");
        this.visible = true;
        const tl = gsap.timeline();
        tl.to(this.lightGlows, {
            visible: "visible",
            stagger: 0.1,
            duration: 2,
        });
        tl.to(this.lightGlows, {
            // y: this.app.screen.height,
            visibile: "hidden",
            duration: 1,
        });
    }
    blinking() {
        const blink = gsap.timeline();
    }
    async drawGlows() {
        //todo: win animation
        for (let i = 0; i < 30; i++) {
            const texture = await Assets.load("light-glow");
            const lightGlow = Sprite.from(texture);
            lightGlow.position.set(
                this.app.screen.width * Math.random(),
                this.app.screen.height * Math.random(),
            );
            lightGlow.visible = false;
            this.addChild(lightGlow);
            this.lightGlows.push(lightGlow);
        }
    }
}
