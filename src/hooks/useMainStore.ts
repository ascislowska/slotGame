import { useContext } from "react";
import { MainStoreContext } from "../stores/mainStore";
export function useMainStore() {
    const context = useContext(MainStoreContext);
    if (!context) {
        throw new Error("context is not available");
    }
    return context;
}
