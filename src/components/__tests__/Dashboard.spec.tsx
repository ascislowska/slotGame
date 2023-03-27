import { fireEvent, render } from "@testing-library/react";
import Dashboard from "../dashboard/Dashboard";
import { MainStoreContext, mainStore } from "../../stores/mainStore";
describe("Dashboard", () => {
    it("should show and update budget", () => {
        const { getByText, getByRole } = render(
            <MainStoreContext.Provider value={mainStore}>
                <Dashboard />
            </MainStoreContext.Provider>,
        );
        const { currency } = mainStore.player;
        const increase = getByRole("button", { name: `+10${currency}` });
        expect(getByText(`Total budget: 0${currency}`)).toBeInTheDocument();
        expect(increase).toBeInTheDocument();
        fireEvent.click(increase);
        expect(getByText(`Total budget: 10${currency}`)).toBeInTheDocument();
    });
    it("should show and update next bet", () => {
        const { getByText, getByRole } = render(
            <MainStoreContext.Provider value={mainStore}>
                <Dashboard />
            </MainStoreContext.Provider>,
        );
        expect(getByText("BET: 0.0")).toBeInTheDocument();
        const increase = getByRole("button", {
            name: `+`,
        });
        fireEvent.click(increase);
        expect(getByText("BET: 0.1")).toBeInTheDocument();
    });
});
