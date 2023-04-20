import React from "react";
import { Header, SideBar } from "../";
const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <SideBar />
      </main>
    </React.Fragment>
  );
};

export default Layout;
