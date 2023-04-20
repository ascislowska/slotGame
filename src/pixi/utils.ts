import { Container, Rectangle } from "pixi.js";

export const centerContainer = (
    container: Container,
    parent: Container | Rectangle,
) => {
    container.pivot.set(container.width / 2, container.height / 2);
    container.position.set(parent.width / 2, parent.height / 2);
};
