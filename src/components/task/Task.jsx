import React from "react";
import { useRef } from "react";
import "./task.css";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const Task = ({ task, storeTasks }) => {
  const taskRef = useRef(false);

  return (
    <div className="content-box" ref={taskRef}>
      <div
        className={`task rounded-3 ${task.priority}-priority`}
        aria-label="task"
      >
        <div className="label">
          <label
            htmlFor={`task-title-${task.id}`}
            onClick={() => {
              taskRef.current.classList.toggle("active");
            }}
          ></label>
          <input
            placeholder={task.title}
            onBlur={(ev) => {
              ev.target.value = "";
            }}
            onFocus={(ev) => {
              ev.target.value = task.title;
              ev.target.select();
            }}
            onChange={(ev) => {
              if (ev.target.value?.trim() && !parseInt(ev.target.value.at(0))) {
                // task.title = ev.target.value;
                const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
                tasks.forEach((t) => {
                  if (t.id === task.id) t.title = ev.target.value;
                });
                storeTasks(tasks);
              }
            }}
            aria-label="text"
            data-task-id={task.id}
          />
        </div>
        <div className="task-actions">
          <span id="edit-task-btn">
            <i>
              <FaRegEdit />
            </i>
          </span>
          <span id="delete-task-btn" role="button" aria-label="Delete task">
            <i>
              <AiFillDelete />
            </i>
          </span>
        </div>
      </div>
      <div className="content rounded-bottom">
        <p>Assignee: {task.assignee}</p>
        <p>Details: {task.details}</p>
        <p id="end-date" className="mt-1">
          <label htmlFor={`task-date${task.id}`}>Date:</label>
          <span id={`task-date-${task.id}`}>{task.date}</span>
        </p>
        <p className="is-done text-end">
          <label htmlFor={`task-isComplete-${task.id}`}>Complete: </label>
          <input
            type="checkbox"
            id={`task-isComplete-${task.id}`}
            name="isComplete"
            checked={task.isComplete}
            onChange={() => {
              const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
              tasks.forEach((t) => {
                if (t.id === task.id) {
                  t.isComplete = !t.isComplete;
                }
              });
              storeTasks(tasks);
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default Task;
