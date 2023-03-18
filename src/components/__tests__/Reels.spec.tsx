import Reels from "../Reels";
import Reel from "../Reel";
import { MainStoreContext, mainStore } from "../../stores/mainStore";
import { render } from "@testing-library/react";
describe("Reels", () => {
    it("Should display 3 reels with symbols", () => {
        const { getByText } = render(
            <MainStoreContext.Provider value={mainStore}>
                <Reels />
            </MainStoreContext.Provider>,
        );
    });
});
