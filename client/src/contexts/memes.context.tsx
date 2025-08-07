import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";

import axios from "@/config/axios";
import type { GetMemesResponse, Meme, UploadMemeFormData, UploadMemeResponse } from "@/types/meme";
import { asyncHandler } from "@/utils/async-handler";

interface MemesState {
  memes: Meme[];
}

type MemesAction =
  | { type: "SET_MEMES"; payload: Meme[] }
  | { type: "UPLOAD_MEME"; payload: Meme }
  | { type: "CLEAR_MEMES" };

interface MemesContext {
  state: MemesState;
  uploadMeme: (formData: UploadMemeFormData) => Promise<void>;
}

export const MemesContext = createContext<MemesContext | null>(null);

const reducer = (state: MemesState, action: MemesAction): MemesState => {
  switch (action.type) {
    case "SET_MEMES":
      return { ...state, memes: action.payload };

    case "UPLOAD_MEME":
      return { ...state, memes: [action.payload, ...state.memes] };

    case "CLEAR_MEMES":
      return { ...state, memes: [] };

    default:
      return state;
  }
};

export function MemesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { memes: [] });

  const fetchMemes = useCallback(() => {
    return asyncHandler(async () => {
      const { data } = await axios.get<GetMemesResponse>("/memes");
      dispatch({ type: "SET_MEMES", payload: data.memes });
    })();
  }, []);

  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);

  const uploadMeme = useCallback(
    async (formData: UploadMemeFormData) => {
      return asyncHandler(async () => {
        const { data } = await axios.post<UploadMemeResponse>("/memes", formData);
        dispatch({ type: "UPLOAD_MEME", payload: data.meme });
      })();
    },
    [dispatch],
  );

  const contextValue = useMemo(() => ({ state, uploadMeme }), [state, uploadMeme]);

  return <MemesContext.Provider value={contextValue}>{children}</MemesContext.Provider>;
}
