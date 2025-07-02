import { Addlist } from "../Api/Add todo";


  export const handleAdd = (e) => {
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
  };