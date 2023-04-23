// function that filter the tasks and return the tasks with current day
function getTasksForCurrentDay(tasks = []) {
  const today = new Date().toDateString(); // get today's date in the format "Day Month Date Year"
  const currentTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date).toDateString(); // convert the task's date to the same format
    return taskDate === today; // return true if the task's date matches today's date
  });
  return currentTasks;
}

// function to return tasks for the next week
function getTasksForNextSevenDays(tasks = []) {
  const today = new Date(); // get today's date
  const nextSevenDays = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7 // change this to 6 to include the current day
  ); // get the date for 7 days from now
  const currentTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date); // convert the task's date to a Date object
    return taskDate >= today && taskDate <= nextSevenDays;
  });
  return currentTasks;
}

export { getTasksForCurrentDay, getTasksForNextSevenDays };
