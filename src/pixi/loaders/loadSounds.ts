import { Assets, SpriteSource } from "pixi.js";
import { sound } from "@pixi/sound";
// import * as sound from "pixi-sound";
// import flickering from "../assets/sounds/neon-flickering.wav";
import "../../assets/sounds/neon-sound.mp3";
// import "./buzz2.mp3";
export const loadSounds = async () => {
    Assets.add("neonSound", "../../assets/sounds/neon-sound.mp3");
    await Assets.load("neonSound");

    // sound.add("neon", "../../assets/sounds/neon-sound.mp3");
    // sound.play("neon");

    // let soundsMap = {
    //     "my-sound": "../../assets/sounds/ringing_of_steel.wav",
    // };
    // await sound.add(soundsMap, { preload: true });
    // sound.play("my-sound");
    // Assets.add("my-sound", "../../assets/buzz2.mp3");
    // await Assets.load("my-sound");
    // Assets.add(
    //     "my-sound",
    //     "../../assets/sounds/examples_resources_applause.ogg",
    // );
    // await Assets.load("my-sound");
    // sound.play("my-sound");
    // Assets.add("flickering", "../../assets/sounds/neon-flickering.wav");
    // await Assets.load("flickering");
};
