import React from "react";
import { Header, SideBar, Main } from "../";
const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="d-flex">
        <SideBar />
        <Main />
      </main>
    </React.Fragment>
  );
};

export default Layout;
