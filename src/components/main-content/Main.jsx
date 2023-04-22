import React, { useState } from "react";
import RelaxImg from "../relax-img/RelaxImg";
import Task from "../task/Task";
import "./main.css";
import AddTaskForm from "../add-task-form/AddTaskForm";

const Main = () => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) ?? []
  );
  const storeTasks = (tasks) => {
    setTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
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
        <div
          className="add-task w-100 rounded"
          onClick={() => {
            setShowAddTaskForm(true);
          }}
        >
          <button className="w-100 rounded">
            <i className="fa-solid fa-plus add-project"></i>
            <span>Add new task</span>
          </button>
        </div>
        <div className="my-accordion">
          {tasks.length === 0 ? (
            <RelaxImg />
          ) : (
            tasks
              .filter((t) => !t.isComplete)
              .map((t) => <Task key={t.id} task={t} storeTasks={storeTasks} />)
          )}
        </div>
      </div>
      <h2 className="fs-6 mt-4">Complete Tasks</h2>
      <div className="my-accordion complete-tasks">
        {tasks
          .filter((t) => t.isComplete)
          .map((t) => (
            <Task key={t.id} task={t} storeTasks={storeTasks}  />
          ))}
      </div>

      <AddTaskForm isShow={showAddTaskForm} closeForm={setShowAddTaskForm} />
    </section>
  );
};

export default Main;
