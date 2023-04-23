import React, { useState } from "react";
import RelaxImg from "../relax-img/RelaxImg";
import Task from "../task/Task";
import "./main.css";
import { DeleteTask, EditTaskForm, AddTaskForm } from "../index";

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
    setTasks(tasks);
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

  return (
    <section id="main-content" className="p-5 w-100">
      <header className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fs-3">Home</h2>
        <label htmlFor="search">
          <span>Search: </span>
          <input type="search" id="search" onChange={handleSearch} />
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
              .map((t) => (
                <Task
                showDeleteTaskAndSetTaskToDelete={showDeleteTaskAndSetTaskToDelete}
                  key={t.id}
                  task={t}
                  showEditTaskAndSetTaskToEdit={showEditTaskAndSetTaskToEdit}
                  storeTasks={storeTasks}
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
            showDeleteTaskAndSetTaskToDelete={showDeleteTaskAndSetTaskToDelete}
              key={t.id}
              task={t}
              showEditTaskAndSetTaskToEdit={showEditTaskAndSetTaskToEdit}
              storeTasks={storeTasks}
            />
          ))}
      </div>

      <AddTaskForm
        isShow={showAddTaskForm}
        closeForm={setShowAddTaskForm}
        storeTasks={storeTasks}
      />

      <EditTaskForm
        isShow={showEditTaskForm}
        setShowEditTaskForm={setShowEditTaskForm}
        storeTasks={storeTasks}
        taskToEdit={taskToEdit}
      />

      <DeleteTask
        isShow={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        storeTasks={storeTasks}
        taskToDelete={taskToDelete}
      />
    </section>
  );
};

export default Main;
