import { createContext, useContext, useState } from "react";

import { useMountAnimation, type UseMountAnimation } from "hooks/use-mount-animation";

import layoutStyles from "styles/context/layout.module.scss";
import menuStyles from "styles/components/menu.module.scss";

interface LayoutContext {
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
  Animation: UseMountAnimation;
  Menu: UseMountAnimation;
}

interface LayoutContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const LayoutContext = createContext<LayoutContext>({} as LayoutContext);

export const useLayoutContext = () => {
  const layoutContext = useContext(LayoutContext);
  if (!layoutContext) throw new Error("Something went wrong with the React Context API!");
  return layoutContext;
};

export const LayoutContextProvider: React.FC<LayoutContextProviderProps> = ({ children }) => {
  const [menuType, setMenuType] = useState("");

  const Animation = useMountAnimation(layoutStyles, true);
  const Menu = useMountAnimation(menuStyles);

  const state: LayoutContext = {
    menuType,
    setMenuType,
    Animation,
    Menu
  };

  return (
    <LayoutContext.Provider value={state}>
      {children}
      <Animation.Component>
        <div className={layoutStyles["logo"]}>
          <img
            alt="MemeIT?"
            src="/assets/logo.png"
          />
        </div>
      </Animation.Component>
    </LayoutContext.Provider>
  );
};
