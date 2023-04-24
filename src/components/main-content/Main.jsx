import React, { useEffect, useState } from "react";
import RelaxImg from "../relax-img/RelaxImg";
import Task from "../task/Task";
import "./main.css";
import { DeleteTask, EditTaskForm, AddTaskForm } from "../index";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  getTasksForCurrentDay,
  getTasksForNextSevenDays,
} from "../tasksFilters";
// useLocation is a hook to get information about the current URL location.
const Main = () => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [taskToDelete, setTaskToDelete] = useState({});
  const [taskToEdit, setTaskToEdit] = useState({});
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) ?? []
  );
  const storeTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleSearch = (ev) => {
    const value = ev.target.value?.trim();
    const temp = JSON.parse(localStorage.getItem("tasks")) ?? [];

    setTasks(
      temp.filter((t) => t.title.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const showEditTaskAndSetTaskToEdit = (task) => {
    setShowEditTaskForm(true);
    setTaskToEdit(task);
  };

  const showDeleteTaskAndSetTaskToDelete = (task) => {
    setShowDeleteModal(true);
    setTaskToDelete(task);
  };

  // const location = useLocation();
  const location = useLocation();

  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const setCurrentTasks = () => {
    if (path === "/") {
      setTasks(JSON.parse(localStorage.getItem("tasks")) ?? []);
    } else if (path === "/today") {
      setTasks(
        getTasksForCurrentDay(JSON.parse(localStorage.getItem("tasks")))
      );
    } else if (path === "/week") {
      setTasks(
        getTasksForNextSevenDays(JSON.parse(localStorage.getItem("tasks")))
      );
    }
  };

  useEffect(() => {
    setCurrentTasks();
  }, [path]);

  return (
    <section id="main-content" className="p-5 w-100">
      <header className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fs-3">{path?.slice(1) || "Home"}</h2>
        <label htmlFor="search">
          <span>Search: </span>
          <input type="search" id="search" onChange={handleSearch} />
        </label>
      </header>
      <div className="tasks-container w-100">
        <Routes>
          <Route
            path="/"
            element=<div
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
          />
        </Routes>

        <div className="my-accordion">
          {tasks.length === 0 ? (
            <RelaxImg />
          ) : (
            tasks
              .filter((t) => !t.isComplete)
              .map((t) => (
                <Task
                  showDeleteTaskAndSetTaskToDelete={
                    showDeleteTaskAndSetTaskToDelete
                  }
                  key={t.id}
                  task={t}
                  showEditTaskAndSetTaskToEdit={showEditTaskAndSetTaskToEdit}
                  storeTasks={storeTasks}
                  setCurrentTasks={setCurrentTasks}
                />
              ))
          )}
        </div>
      </div>
      <h2 className="fs-6 mt-4">Complete Tasks</h2>
      <div className="my-accordion complete-tasks">
        {tasks
          .filter((t) => t.isComplete)
          .map((t) => (
            <Task
              showDeleteTaskAndSetTaskToDelete={
                showDeleteTaskAndSetTaskToDelete
              }
              key={t.id}
              task={t}
              showEditTaskAndSetTaskToEdit={showEditTaskAndSetTaskToEdit}
              storeTasks={storeTasks}
              setCurrentTasks={setCurrentTasks}
            />
          ))}
      </div>
      <hr className="mt-5" />
      <table className="table table-striped table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Home</th>
            <th scope="col">Today</th>
            <th scope="col">Week</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{tasks.length}</td>
            <td>{ getTasksForCurrentDay(tasks).length }</td>
            <td>{ getTasksForNextSevenDays(tasks).length }</td>
          </tr>
        </tbody>
      </table>
      <AddTaskForm
        setTasks={setTasks}
        isShow={showAddTaskForm}
        closeForm={setShowAddTaskForm}
        storeTasks={storeTasks}
      />

      <EditTaskForm
        isShow={showEditTaskForm}
        setShowEditTaskForm={setShowEditTaskForm}
        setCurrentTasks={setCurrentTasks}
        taskToEdit={taskToEdit}
      />

      <DeleteTask
        isShow={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        setCurrentTasks={setCurrentTasks}
        taskToDelete={taskToDelete}
      />
    </section>
  );
};

export default Main;
