import { createContext, useContext, useEffect, useState } from "react";
import type { Meme } from "services/memes.service";

interface Context {
  memes: Meme[];
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
}

export interface FormData {
  description: string;
  image: ArrayBuffer | string;
}

export const MemesContext = createContext<Context>({} as Context);

export const useMemesContext = () => {
  const hookName = "useMemesContext";
  const providerName = "MemesContextProvider";

  const memesContext = useContext(MemesContext);
  if (!memesContext) throw new Error(`${hookName} hook must be inside ${providerName}!`);

  return memesContext;
};

export const MemesContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const getMemes = async () => {
      try {
        const { memesService } = await import("services/memes.service");
        const { data } = await memesService.getMemes();
        setMemes(data);
      } catch (error: any) {
        alert(error.response.data.message);
      }
    };

    getMemes();
  }, []);

  const state: Context = {
    memes,
    setMemes
  };

  return <MemesContext.Provider value={state}>{children}</MemesContext.Provider>;
};
