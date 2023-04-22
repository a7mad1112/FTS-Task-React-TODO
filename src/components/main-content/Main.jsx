import React from "react";
import RelaxImg from "../relax-img/RelaxImg";
import Task from "../task/Task";
import './main.css'

const Main = () => {
  const tasks = [
    {
      title: "css",
      assignee: "Ahmed",
      priority: "high",
      details: "some details",
      date: "2023",
      isComplete: false,
      id: 73.23329474431515,
    },
    {
      title: "js",
      assignee: "",
      priority: "",
      details: "",
      date: "",
      isComplete: false,
      id: 41.35665732833391,
    },
    {
      title: "html",
      assignee: "",
      priority: "",
      details: "",
      date: "",
      isComplete: true,
      id: 44.35665732833391,
    },
  ];

  return (
    <section id="main-content" className="p-5 w-100">
      <header className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fs-3">Home</h2>
        <label htmlFor="search">
          <span>Search: </span>
          <input type="search" id="search" />
        </label>
      </header>
      <div className="tasks-container w-100">
        <div className="add-task w-100 rounded">
          <button className="w-100 rounded">
            <i className="fa-solid fa-plus add-project"></i>
            <span>Add new task</span>
          </button>
        </div>
        <div className="my-accordion">
          {
            tasks.length === 0 ? <RelaxImg/> : (
              tasks.filter(t => !t.isComplete).map(t => <Task key={t.id} task={t} />)
            )
          }
        </div>
      </div>
      <h2 className="fs-6 mt-4">Complete Tasks</h2>
      <div className="my-accordion complete-tasks">
        {
          tasks.filter(t => t.isComplete).map(t => <Task key={t.id} task={t} />)
        }
      </div>
    </section>
  );
};

export default Main;
