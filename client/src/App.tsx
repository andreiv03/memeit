import { useState } from "react";

import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Home from "@/pages/home.page";
import "@/styles/globals.scss";

export default function App() {
  const [menuType, setMenuType] = useState("");

  return (
    <>
      <Header menuType={menuType} setMenuType={setMenuType} />
      <Menu menuType={menuType} setMenuType={setMenuType} />
      <Home />
      <Footer />
    </>
  );
}
