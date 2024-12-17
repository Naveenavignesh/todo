import React, { useState } from "react";
import "../styles/ToDo.css";

const ToDo = ({ user, onLogout, tasks, addTask, updateTask, deleteTask }) => {
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask("");
    }
  };

  const handleUpdateTask = () => {
    if (editText.trim()) {
      updateTask(editingTaskId, editText);
      setEditingTaskId(null);
      setEditText("");
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>✅ My Todo-s</h2>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      {user.role === "admin" && (
        <div className="input-container">
          <input
            type="text"
            placeholder="Add new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask} className="action-btn">
            Add
          </button>
        </div>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleUpdateTask} className="action-btn">
                  Update
                </button>
                <button
                  onClick={() => setEditingTaskId(null)}
                  className="action-btn"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                {user.role === "admin" && (
                  <>
                    <button
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditText(task.title);
                      }}
                      className="action-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="action-btn"
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
