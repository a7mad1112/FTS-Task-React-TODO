import React from "react";
import "./delete-task.css";
import { FaRegWindowClose } from "react-icons/fa";

const DeleteTask = ({ isShow, setShowDeleteModal, taskToDelete, setCurrentTasks }) => {
  const handleDelete = () => {
    // delete from local storage
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        [...JSON.parse(localStorage.getItem("tasks"))].filter(
          (t) => t.id !== taskToDelete.id
        )
      )
    );

    setCurrentTasks();
    setShowDeleteModal(false);
  };
  return (
    <div
      id="delete-task-modal"
      className={`my-modal ${isShow && "show-modal"}`}
      onClick={({ target, currentTarget }) => {
        if (target === currentTarget) setShowDeleteModal(false);
      }}
    >
      <div className="my-modal-content rounded">
        <header className="py-4 px-3 rounded-top d-flex align-items-center justify-content-between">
          <h3>Delete Task</h3>
          <span
            className="close-delete-task-form close-task-form"
            onClick={() => setShowDeleteModal(false)}
          >
            <i>
              <FaRegWindowClose />
            </i>
          </span>
        </header>

        <div className="p-3" id="delete-task-form">
          <div className="form-group">
            <p>
              Are you sure Delete <strong>"{taskToDelete.title}"</strong> Task
            </p>
          </div>
          <div className="form-group mt-3 d-flex gap-3 justify-content-end">
            <button
              id="cancel-button"
              type="submit"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button id="delete-task" type="submit" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
