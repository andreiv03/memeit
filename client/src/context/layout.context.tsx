import { createContext, useContext, useState } from "react";

import { useMountAnimation, type UseMountAnimation } from "hooks/use-mount-animation";

import layoutStyles from "styles/context/layout.module.scss";
import menuStyles from "styles/components/menu.module.scss";

interface Context {
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
  Animation: UseMountAnimation;
  Menu: UseMountAnimation;
}

export const LayoutContext = createContext<Context>({} as Context);

export const useLayoutContext = () => {
  const hookName = "useLayoutContext";
  const providerName = "LayoutContextProvider";

  const layoutContext = useContext(LayoutContext);
  if (!layoutContext) throw new Error(`${hookName} hook must be inside ${providerName}!`);

  return layoutContext;
};

export const LayoutContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [menuType, setMenuType] = useState("");

  const Animation = useMountAnimation(layoutStyles, true);
  const Menu = useMountAnimation(menuStyles);

  const state: Context = {
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
