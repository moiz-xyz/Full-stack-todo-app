import { useState } from "react";
import { Addlist } from "../Api/Add todo.js";
import { Deletelist } from "../Api/deleteTodo.js";
import { Editlist } from "../Api/editTodo.js";

const Todo = () => {
    
  const [task, setTask] = useState("");           
  const [tasks, setTasks] = useState([]);          
  const [editIndex, setEditIndex] = useState(null); 


  const handleDBAdd = async (e) => {
    e.preventDefault(); 
    try {
        const res = await Addlist({title: task});
      console.log("list added", res);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

const handleDBedit = async (e) => {
    e.preventDefault(); 
    try {
        const res = await Editlist();
      console.log("list edit", res);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

const handleDBdelete = async (e) => {
    e.preventDefault(); 
    try {
        const res = await Deletelist(task);
      console.log("list delete", res);
    } catch (error) {
      console.error(error.response?.data);
    }
  };



  const handleAdd = (e) => {
    e.preventDefault();

    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTask("");
    handleDBsubmit()
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
    handleDBedit()
  };

  const handleDelete = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setTask("");
    }
    handleDBdelete()
  };

  return (
    <div className="main">
      <h2 style={{ textAlign: "center" }}> React Todo App</h2>

      <form onSubmit={handleAdd} className="form">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t, index) => (
          <li
            key={index}
            style={{
              background: "#f0f0f0",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{t}</span>
            <div>
              <button onClick={() => handleEdit(index)} style={{ marginRight: "10px" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
