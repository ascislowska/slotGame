import { Assets } from "pixi.js";
import { symbolsKeys, glows } from "../consts";

import burger from "../../assets/symbols/burger.png";
import cafe from "../../assets/symbols/cafe.png";
import drink from "../../assets/symbols/drink.png";
import music from "../../assets/symbols/music.png";
import star from "../../assets/symbols/burger.png";

import blueGlow from "../../assets/glows/blue-glow.png";
import lightGlow from "../../assets/glows/light-glow.png";
import lightpinkGlow from "../../assets/glows/lightpink-glow.png";
import pinkGlow from "../../assets/glows/pink-glow.png";

import borderNeon from "../../assets/border-neon.png";
import spin from "../../assets/play.png";
import check from "../../assets/check.png";
import night from "../../assets/night.jpg";
import { loadSounds } from "./loadSounds";

export const loadAssets = async () => {
    Assets.add("burger", burger);
    Assets.add("cafe", cafe);
    Assets.add("drink", drink);
    Assets.add("music", music);
    Assets.add("star", star);
    symbolsKeys.forEach(async (symbol) => {
        await Assets.load(symbol);
    });

    Assets.add("blueGlow", blueGlow);
    Assets.add("lightGlow", lightGlow);
    Assets.add("lightpinkGlow", lightpinkGlow);
    Assets.add("pinkGlow", pinkGlow);

    glows.forEach(async (element) => {
        await Assets.load(element);
    });

    Assets.add("border-neon", borderNeon);
    await Assets.load("border-neon");
    Assets.add("spin", spin);
    await Assets.load("spin");
    Assets.add("check", check);
    Assets.load("check");
    Assets.add("night", night);
    await Assets.load("night");

    await loadSounds();
};
