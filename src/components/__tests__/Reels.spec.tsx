import Reels from "../Reels";
import Reel from "../Reel";
import { MainStoreContext, mainStore } from "../../stores/mainStore";
import { render } from "@testing-library/react";
describe("Reels", () => {
    it("Should display 3 reels with symbols", () => {
        const { getAllByText } = render(
            <MainStoreContext.Provider value={mainStore}>
                <Reels />
            </MainStoreContext.Provider>,
        );
        const symbols = getAllByText(/0|7/);
        expect(symbols).toHaveLength(9);
    });
});
