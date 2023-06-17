import React, { useState, useEffect } from 'react'
import cross from '../images/icon-cross.svg'
import axios from 'axios'

const Tasks = ({ actionsChosen, setActionsChosen, color }) => {
  const [taskname, setTaskname] = useState("")
  const [completed, setCompleted] = useState(false)
  const [tasks, setTasks] = useState([])
  const [isActive, setIsActive] = useState([])
  const [isCompleted, setIsCompleted] = useState([])
  const [actionstasks, setActionstasks] = useState([])
  const [error, setError] = useState("")

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://todo-app-backend-wqdo.onrender.com");
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
        "https://todo-app-backend-wqdo.onrender.com",
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
        "https://todo-app-backend-wqdo.onrender.com",
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
        "https://todo-app-backend-wqdo.onrender.com",
        { data: { id: tastId } }
      );
      fetchTasks();
      setError("")
    } catch (err) {
      setError(err.response.data.message)
    }
  };

  const handleDeleteAll = () => {
    isCompleted.map(async (task) => {
      try {
        await axios.delete(
          "https://todo-app-backend-wqdo.onrender.com",
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

  useEffect(() => {
    setIsActive([])
    setIsCompleted([])

    tasks.forEach((task) => {
      if (task.completed === false) {
        setIsActive(current => [...current, task]);
      } else {
        setIsCompleted(current => [...current, task]);
      }
    })

    if (actionsChosen === "all") {
      setActionstasks(tasks)
    }
  }, [tasks, actionsChosen]);

  useEffect(() => {
    if (actionsChosen === "active") {
      setActionstasks(isActive)
    }
  }, [isActive, actionsChosen]);

  useEffect(() => {
    if (actionsChosen === "completed") {
      setActionstasks(isCompleted)
    }
  }, [isCompleted, actionsChosen]);

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
          {actionstasks.map((task, index) => (
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
                <p>{task.taskname}</p>
                <button
                  onClick={(event) => handleDelete(event, index)}
                ><img src={cross} alt="Cross icon for deleting a task" /></button>
              </div>
            </li>
          ))}
        </ul>
        <div
          className={(color === "light" ? 'actions' : 'actions--dark')}>

          <p>{isActive.length} items left</p>
          <div
            className={(color === "light" ? 'buttons' : 'buttons--dark')}>
            <button
              onClick={() => setActionsChosen("all")}
              style={{ color: (actionsChosen === "all") ? "var(--bright-blue)" : "" }}
            >All</button>
            <button
              onClick={() => setActionsChosen("active")}
              style={{ color: (actionsChosen === "active") ? "var(--bright-blue)" : "" }}
            >Active</button>
            <button
              onClick={() => setActionsChosen("completed")}
              style={{ color: (actionsChosen === "completed") ? "var(--bright-blue)" : "" }}
            >Completed</button>
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