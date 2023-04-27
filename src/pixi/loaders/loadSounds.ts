import { sound } from "@pixi/sound";

export const loadSounds = async () => {
    sound.add("music", {
        url: process.env.PUBLIC_URL + "/assets/sounds/SummerTown.mp3",
        volume: 0.2,
        loop: true,
    });
    sound.play("music");
    sound.add("neon", {
        url: process.env.PUBLIC_URL + "/assets/sounds/neontube.wav",
    });
    sound.add("winSound", {
        url: process.env.PUBLIC_URL + "/assets/sounds/win.mp3",
        volume: 0.2,
    });
};
