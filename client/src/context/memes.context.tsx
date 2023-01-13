import { createContext, useContext, useEffect, useState } from "react";

import { useLayoutContext } from "context/layout.context";
import type { Meme } from "services/memes.service";

interface MemesContext {
  callback: boolean;
  setCallback: React.Dispatch<React.SetStateAction<boolean>>;
  memes: Meme[];
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
}

interface MemesContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface MemesFormData {
  description: string;
  image: ArrayBuffer | string;
}

const MemesContext = createContext<MemesContext>({} as MemesContext);

export const useMemesContext = () => {
  const memesContext = useContext(MemesContext);
  if (!memesContext) throw new Error("Something went wrong with the React Context API!");
  return memesContext;
};

export const MemesContextProvider: React.FC<MemesContextProviderProps> = ({ children }) => {
  const [callback, setCallback] = useState(false);
  const [memes, setMemes] = useState<Meme[]>([]);

  const layoutContext = useLayoutContext();

  useEffect(() => {
    const getMemes = async () => {
      try {
        const { memesService } = await import("services/memes.service");
        const { data } = await memesService.getMemes();
        setMemes(data);
        if (layoutContext.Animation.isMounted) layoutContext.Animation.handleStopAnimation();
      } catch (error: any) {
        if (layoutContext.Animation.isMounted) layoutContext.Animation.handleStopAnimation();
        alert(error.response.data.message);
      }
    };

    getMemes();
  }, [callback]);

  const state: MemesContext = {
    callback,
    setCallback,
    memes,
    setMemes
  };

  return <MemesContext.Provider value={state}>{children}</MemesContext.Provider>;
};
