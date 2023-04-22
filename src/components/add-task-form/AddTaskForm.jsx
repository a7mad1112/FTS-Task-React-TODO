import React, { useRef, useState } from "react";
import "./add-task-form.css";
import { FaRegWindowClose } from "react-icons/fa";

const AddTaskForm = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    assignee: "",
    details: "",
    priority: "",
    id: Math.random() * 10,
    date: "",
    isComplete: false,
  });

  const form = useRef();
  const [inputsErr, setInputsErr] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    console.log(inputsValue);
    setInputsValue({ ...inputsValue, [name]: value });
    console.log(inputsValue);
  };

  return (
    <div id="add-task-form" className="my-modal show-modal">
      <div className="my-modal-content rounded">
        <header className="py-4 px-3 rounded-top d-flex align-items-center justify-content-between">
          <h3>New Task</h3>
          <span className="close-add-task-form close-task-form">
            <i>
              <FaRegWindowClose />
            </i>
          </span>
        </header>
        <form className="p-3" id="add-task-modal" ref={form}>
          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-name">
              Title
            </label>
            <input
              onChange={handleChange}
              className="d-block"
              name="title"
              type="text"
              id="task-name"
            />
            <p className="title-err"></p>
          </div>

          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-assignee">
              Assignee
            </label>
            <input
              onChange={handleChange}
              className="d-block"
              name="assignee"
              type="text"
              id="task-assignee"
            />
          </div>

          <div className="form-group mb-2">
            <label className="d-block" htmlFor="task-details">
              Details (notes)
            </label>
            <textarea
              onChange={handleChange}
              id="task-details"
              name="details"
              placeholder="Important details of your task..."
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
                <label htmlFor="due-date">
                  Due Date
                </label>
                <input onChange={handleChange} name="date" type="date" id="due-date" />
              </div>
            </div>
          </div>
          <div className="form-group mt-3">
            <button id="add-task" type="submit">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;