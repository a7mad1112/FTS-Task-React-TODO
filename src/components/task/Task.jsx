import React from "react";
import { useRef } from "react";
import "./task.css";

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
            value={task.title}
            onChange={() => console.log("Here")}
            aria-label="text"
            data-task-id={task.id}
          />
        </div>
        <div className="task-actions">
          <span id="edit-task-btn">
            <i className="fa-solid fa-pen"></i>
          </span>
          <span id="delete-task-btn" role="button" aria-label="Delete task">
            <i className="fa-solid fa-trash"></i>
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
