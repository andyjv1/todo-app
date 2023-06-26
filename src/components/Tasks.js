import React, { useState, useEffect } from 'react'
import cross from '../images/icon-cross.svg'
import axios from 'axios'
import Button from './Button'

const Tasks = ({ actionsChosen, setActionsChosen, color }) => {
  const [taskname, setTaskname] = useState("")
  const [completed, setCompleted] = useState(false)
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState("")

  const filters = {
    All: tasks,
    Active: tasks.filter((task) => !task.completed),
    Completed: tasks.filter((task) => task.completed),
  };

  const filteredTasks = filters[actionsChosen];

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://todo-app-backend-wqdo.onrender.com/tasks");
      setTasks(response.data);
      setError("")
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message)
      setTasks([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://todo-app-backend-wqdo.onrender.com/tasks",
        { taskname, completed },
      );
      fetchTasks();
      setTaskname("")
      setCompleted(false)
      setError("")
    } catch (err) {
      setError(err.response.data.message)
      setTaskname("")
      setCompleted(false)
    }
  };

  const handleCheckbox = async (event, index) => {
    const { checked } = event.target;
    const tastId = tasks[index]._id
    const tastCompleted = checked
    try {
      await axios.patch(
        "https://todo-app-backend-wqdo.onrender.com/tasks",
        { id: tastId, completed: tastCompleted },
      );
      fetchTasks();
      setError("")
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  const handleDelete = async (event, index) => {
    const tastId = tasks[index]._id
    try {
      await axios.delete(
        "https://todo-app-backend-wqdo.onrender.com/tasks",
        { data: { id: tastId } }
      );
      fetchTasks();
      setError("")
    } catch (err) {
      setError(err.response.data.message)
    }
  };

  const handleDeleteAll = () => {
    filters.Completed.map(async (task) => {
      try {
        await axios.delete(
          "https://todo-app-backend-wqdo.onrender.com/tasks",
          { data: { id: task._id } }
        );
        fetchTasks();
        setError("")
      } catch (err) {
        setError(err.response.data.message)
      }
    })
  };

  useEffect(() => {
    fetchTasks()
  }, []);


  return (
    <main>
      <div
        style={{ display: error ? "flex" : "none" }}
        className={(color === "light" ? 'error' : 'error-dark')}
      >
        <p>{error}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className={(color === "light" ? '' : 'form-dark')}
      >
        <label
          className={(color === "light" ? 'checkbox-label' : 'checkbox-label--dark')}>
          <input type="checkbox"
            onChange={() => {
              setCompleted(!completed)
            }}
            checked={completed}
          />
          <span ></span>
        </label>
        <input
          type="text"
          placeholder="Create a new todo…"
          name="task"
          id="task"
          value={taskname}
          onChange={(event) => {
            setTaskname(event.target.value)
          }}
        />
      </form>
      <div className="tasks">
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index}>
              <div
                className={(color === "light" ? 'task' : 'task--dark')}
                style={{ borderRadius: (index === 0) ? "4px 4px 0 0" : "0" }}
              >
                <label
                  className={(color === "light" ? 'checkbox-label--task' : 'checkbox-label--taskDark')}>
                  <input type="checkbox"
                    checked={task.completed}
                    onChange={(event) => handleCheckbox(event, index)}
                  />
                  <span></span>
                </label>
                <p
                  style={{
                    color: task.completed && color === "light" ? 'var(--light-grayish-blue)' : task.completed && color !== "light" ? 'var(--very-dark-grayish-blue2)' : 'none',
                    textDecoration: task.completed ? "line-through" : "none"
                  }}
                >{task.taskname}</p>
                <button
                  onClick={(event) => handleDelete(event, index)}
                ><img src={cross} alt="Cross icon for deleting a task" /></button>
              </div>
            </li>
          ))}
        </ul>
        <div
          className={(color === "light" ? 'actions' : 'actions--dark')}>

          <p>{filters.Active.length} items left</p>
          <div
            className={(color === "light" ? 'buttons' : 'buttons--dark')}>
            <Button
              setActionsChosen={setActionsChosen}
              actionsChosen={actionsChosen}
              setActions={"All"}
            />
            <Button
              setActionsChosen={setActionsChosen}
              actionsChosen={actionsChosen}
              setActions={"Active"}
            />
            <Button
              setActionsChosen={setActionsChosen}
              actionsChosen={actionsChosen}
              setActions={"Completed"}
            />
          </div>
          <button
            onClick={() => handleDeleteAll()}
            className={(color === "light" ? 'button-light' : 'button-dark')}>
            Clear Completed</button>
        </div>

      </div>

    </main>
  )
}

export default Tasks