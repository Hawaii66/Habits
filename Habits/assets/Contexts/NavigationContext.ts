import { createContext } from "react";
import { INavType } from "../Components/Menu/Menu";
import { IFamily } from "../Interfaces/Family";

interface INavigationContext {
    navigation:INavType,
    setNavigation:(nav:INavType) => void
}

export const NavigationContext = createContext<INavigationContext>(
    {
        navigation:"Todo",
        setNavigation:(_)=>{}
    }
)