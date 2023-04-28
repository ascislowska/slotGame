import { Container, Rectangle } from "pixi.js";

export const centerContainer = (
    container: Container,
    parent: Container | Rectangle,
) => {
    container.pivot.set(container.width / 2, container.height / 2);
    container.position.set(parent.width / 2, parent.height / 2);
};
export const getBiggerSize = (screen: Rectangle) => {
    return screen.width >= screen.height ? screen.width : screen.height;
};
export const mobileLandscape = (screen: Rectangle) => {
    return screen.height < 800 && screen.width / screen.height >= 2;
};
