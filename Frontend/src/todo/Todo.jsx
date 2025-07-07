import { useState, useEffect } from "react";
import { getList } from "../Api/gettodo";
import { Editlist } from "../Api/editTodo";
import { Deletelist } from "../Api/deleteTodo";
import { Addlist } from "../Api/TodoApi";


const Todo = () => {

  const [todos, setTodos] = useState([]);
  const [task, setTask]   = useState("");
  const [editId, setEditId] = useState(null); 

  useEffect(() => {
    (async () => {
      try {
       const res = await getList(); 
       setTodos(res.data.map(({ _id, task }) => ({ id: _id, task })));
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    try {
      if (editId) {
        const updated = await Editlist(editId, { task });
        setTodos((prev) =>
          prev.map((t) =>
            t.id === editId ? { ...t, task } : t
          )
        );
        setEditId(null);
      } else {
        const created = await Addlist(task);
        setTodos((prev) => [...prev, { id: Date.now(), task }]);
      }

      setTask("");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const startEdit = (id, currentTask) => {
    setEditId(id);
    setTask(currentTask);
  };

  const handleDelete = async (id) => {
    try {
      await Deletelist(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      if (editId === id) {
        setEditId(null);
        setTask("");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="main">
      <h2 style={{ textAlign: "center" }}>React Todo App</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <ul>
        {todos.map(({ id, task } , index) => (
          <li
            key={id || `${index}`}>
            <span>{task}</span>
            <div>
              <button
                onClick={() => startEdit(id, task)}
                style={{ marginRight: "10px" }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
