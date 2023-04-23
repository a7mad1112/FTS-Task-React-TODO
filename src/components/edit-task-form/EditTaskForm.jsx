import React, { useEffect, useRef, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

const EditTaskForm = ({
  isShow,
  setShowEditTaskForm,
  setCurrentTasks,
  taskToEdit,
}) => {
  const closeModal = () => {
    setShowEditTaskForm(false);
  };

  useEffect(() => {
    setInputsValue({
      title: taskToEdit.title,
      assignee: taskToEdit.assignee,
      details: taskToEdit.details,
      priority: taskToEdit.priority,
      date: taskToEdit.date,
    });
  }, [taskToEdit]);

  const [inputsValue, setInputsValue] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputsValue({ ...inputsValue, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title?.trim()) {
      errors.title = "Title name is required!";
    } else if (parseInt(values.title?.trim()?.at(0))) {
      errors.title = "This is not a valid task name!";
    }

    if (!values.assignee?.trim()) errors.assignee = "Assignee is required!";
    else if (parseInt(values.assignee.trim()?.at(0)))
      errors.assignee = "This is not a valid Assignee!";
    return errors;
  };

  const handleSubmit = (eve) => {
    eve.preventDefault();
    if (Object.keys(validate(inputsValue)).length === 0) {
      // edit in local storage:
      const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
      tasks.forEach((t, i) => {
        if (t.id === taskToEdit.id)
          tasks[i] = {
            ...tasks[i],
            ...inputsValue,
          };
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));

      setCurrentTasks()
      closeModal();
    }
  };

  return (
    <div
      onClick={(ev) => {
        ev.target === ev.currentTarget && closeModal();
      }}
      id="add-task-form"
      className={`my-modal ${isShow && "show-modal"}`}
    >
      <div className="my-modal-content rounded">
        <header className="py-4 px-3 rounded-top d-flex align-items-center justify-content-between">
          <h3>Edit Task</h3>
          <span
            className="close-add-task-form close-task-form"
            onClick={closeModal}
          >
            <i>
              <FaRegWindowClose />
            </i>
          </span>
        </header>
        <form className="p-3" id="add-task-modal" onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-name">
              Title
            </label>
            <input
              onFocus={({ target }) => {
                target.select();
              }}
              onChange={handleChange}
              value={inputsValue.title ?? ""}
              className="d-block"
              name="title"
              type="text"
              id="task-name"
            />
            <p className="title-err">{validate(inputsValue)?.title}</p>
          </div>

          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-assignee">
              Assignee
            </label>
            <input
              onFocus={({ target }) => {
                target.select();
              }}
              onChange={handleChange}
              value={inputsValue.assignee ?? ""}
              className="d-block"
              name="assignee"
              type="text"
              id="task-assignee"
            />
            <p className="title-err">{validate(inputsValue)?.assignee}</p>
          </div>

          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-details">
              Details (notes)
            </label>
            <textarea
              onFocus={({ target }) => {
                target.select();
              }}
              onChange={handleChange}
              value={inputsValue.details ?? ""}
              id="task-details"
              name="details"
            ></textarea>
          </div>
          <div className="form-group mb-2">
            <div className="row gap-3">
              <div className="col p-0">
                <label htmlFor="select-priority" data-color="">
                  Priority
                </label>
                <select
                  onChange={handleChange}
                  value={inputsValue.priority ?? "none"}
                  className="d-block"
                  name="priority"
                  id="select-priority"
                >
                  <option value="none">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="col p-0">
                <label htmlFor="due-date">Due Date</label>
                <input
                  onChange={handleChange}
                  value={inputsValue.date ?? ""}
                  name="date"
                  type="date"
                  id="due-date"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-3">
            <button id="add-task" type="submit">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
