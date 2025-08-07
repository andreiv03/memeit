import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthProvider } from "@/contexts/auth.context";
import { MemesProvider } from "@/contexts/memes.context";

import App from "@/app";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <MemesProvider>
        <App />
      </MemesProvider>
    </AuthProvider>
  </StrictMode>,
);
