import React from "react";
import { Header, SideBar, Main, AddTaskForm } from "../";
const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="d-flex">
        <SideBar />
        <Main />
        <AddTaskForm />
      </main>
    </React.Fragment>
  );
};

export default Layout;
