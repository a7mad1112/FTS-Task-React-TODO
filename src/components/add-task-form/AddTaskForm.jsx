import React, { useEffect, useRef, useState } from "react";
import "./add-task-form.css";
import { FaRegWindowClose } from "react-icons/fa";

// function to generate infinite unique ID's
// import { generateUniqueNumbers } from '../../uniqueNumbers';

const AddTaskForm = ({ isShow, closeForm, storeTasks, setTasks }) => {
  // const IDs = generateUniqueNumbers;
  const modal = useRef();
  const closeModal = () => {
    closeForm(false);
  };
  const form = useRef();

  useEffect(() => {
    // Access the form DOM node
    const formNode = form.current;

    // Select all input, select, and textarea elements
    const formInputs = formNode.querySelectorAll("input, select, textarea");

    // Set the value of each element to an empty string
    formInputs.forEach((input) => {
      input.value = "";
    });
  }, [isShow]);

  const [inputsValue, setInputsValue] = useState({
    title: "",
    assignee: "",
    details: "",
    priority: "",
    date: "",
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setInputsValue((prevInputsValue) => ({
      ...prevInputsValue,
      [name]: value,
    }));
    setInputsErrors(validate({ ...inputsValue, [name]: value }));
  };

  const handleSubmit = (eve) => {
    eve.preventDefault();
    if (Object.keys(validate(inputsValue)).length === 0) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
      const newTask = {
        // id: IDs().next().value,
        id: Math.random() * 100,
        isComplete: false,
        ...inputsValue,
      };
      storeTasks([newTask, ...tasks]);
      setTasks([newTask, ...tasks]);
      closeModal();
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title.trim()) {
      errors.title = "Title name is required!";
    } else if (parseInt(values.title.trim()?.at(0))) {
      errors.title = "This is not a valid task name!";
    }

    if (!values.assignee.trim()) errors.assignee = "Assignee is required!";
    else if (parseInt(values.assignee.trim()?.at(0)))
      errors.assignee = "This is not a valid Assignee!";

    return errors;
  };

  const [inputsErrors, setInputsErrors] = useState({
    x: "no errors in initial value, this key in initial value only for the length of kays be not zero",
  });

  return (
    <div
      id="add-task-form"
      ref={modal}
      className={`my-modal ${isShow && "show-modal"}`}
      onClick={(e) => {
        if (e.currentTarget === e.target) closeModal();
      }}
    >
      <div className="my-modal-content rounded">
        <header className="py-4 px-3 rounded-top d-flex align-items-center justify-content-between">
          <h3>New Task</h3>
          <span
            className="close-add-task-form close-task-form"
            onClick={closeModal}
          >
            <i>
              <FaRegWindowClose />
            </i>
          </span>
        </header>
        <form
          onSubmit={handleSubmit}
          className="p-3"
          id="add-task-modal"
          ref={form}
        >
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
            <p className="title-err">{inputsErrors?.title}</p>
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
            <p className="title-err">{inputsErrors?.assignee}</p>
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
                <label htmlFor="due-date">Due Date</label>
                <input
                  onChange={handleChange}
                  name="date"
                  type="date"
                  id="due-date"
                />
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
