import React, { useState } from "react";
import Login from "./components/Login";
import ToDo from "./components/ToDo";

const App = () => {
  const [user, setUser] = useState(null);

  // Shared tasks state
  const [tasks, setTasks] = useState([]);

  // Task management functions
  const addTask = (title) => {
    setTasks([...tasks, { id: Date.now(), title }]);
  };

  const updateTask = (id, updatedTitle) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title: updatedTitle } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ToDo
          user={user}
          onLogout={handleLogout}
          tasks={tasks}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      )}
    </>
  );
};

export default App;
