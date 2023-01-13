import React from "react";
import ReactDOM from "react-dom/client";

import { AuthContextProvider } from "context/auth.context";
import { LayoutContextProvider } from "context/layout.context";
import { MemesContextProvider } from "context/memes.context";

import "styles/globals.scss";
import Footer from "components/footer.component";
import Header from "components/header.component";
import Menu from "components/menu.component";
import Home from "pages/home.page";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <LayoutContextProvider>
      <AuthContextProvider>
        <MemesContextProvider>
          <Header />
          <Menu />
          <Home />
          <Footer />
        </MemesContextProvider>
      </AuthContextProvider>
    </LayoutContextProvider>
  </React.StrictMode>
);
