import { Assets } from "pixi.js";
import { symbolsKeys } from "./consts";
export const loadAssets = async () => {
    for (let i = 0; i < symbolsKeys.length; i++) {
        Assets.add(`${i}`, `../../assets/symbols/${i}.png`);
    }

    Assets.add("play", "../../assets/symbols/play.svg");
    await Assets.load(["0", "1", "2", "3", "4", "5", "6"]);
    Assets.add("lemon", `../../assets/symbols/lemon.png`);
    Assets.add("club", `../../assets/symbols/club.png`);
    await Assets.load(["lemon", "club"]);
    await Assets.load("play");
    Assets.add("coin", `../../assets/coin.png`);
    await Assets.load("coin");
    Assets.add("border", `../../assets/frame-silver.png`);
    await Assets.load("border");
    Assets.add("spin", `../../assets/spin.jpg`);
    Assets.load("spin");
};
