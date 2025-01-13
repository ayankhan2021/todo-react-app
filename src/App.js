import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import './App.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todostr = localStorage.getItem("todos");
    if (todostr) {
      const todos = JSON.parse(todostr);
      settodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (editId) {
      const updatedTodos = todos.map(item =>
        item.id === editId ? { ...item, todo } : item
      );

      settodos(updatedTodos);
      setEditId(0);
    } else {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    settodo("");
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleEdit = (id) => {
    const edit_todo = todos.find(item => item.id === id);
    settodo(edit_todo.todo);
    setEditId(id);
  };

  const handleDelete = (id) => {
    const newtodos = todos.filter(item => item.id !== id);
    settodos(newtodos);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return id === item.id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  return (
    <div className="App">
      <h1 className='todo-header'>My-Todo-List</h1>
      <div className="todo-cont">
        <h1>Task List - 2025</h1>
        <div className="input__section">
          <input
            onChange={handleChange}
            className="input__field"
            value={todo}
            type="text"
            placeholder="Enter Todo"
          />
          <button
            style={{
              opacity: todo.length <= 3 ? "0.5" : "1",
              cursor: todo.length <= 3 ? 'not-allowed' : 'pointer'
            }}
            onClick={handleAdd}
          >
            {editId ? 'Update' : 'Add'}
          </button>
        </div>
        <input type="checkbox" style={{ margin: "10px 20px" }} onClick={toggleFinished} checked={showFinished} />Show Finished.
        <div className="todos">
          {todos.length === 0 && <h3 style={{ marginLeft: "23px" }}>No todos to display.</h3>}
          {todos.map((item) => (
            (showFinished || !item.isCompleted) && <div key={item.id} className="todo">
              <div className="todo-text">
                <input
                  className="check"
                  name={item.id}
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={handleCheckbox}
                />
                <span className={` ${item.isCompleted ? "line" : "no-line"}`}>{item.todo}</span>
              </div>
              <div className="todo-btns">
                <button className='edit__del' onClick={() => handleEdit(item.id)}><FaEdit /></button>
                <button className='edit__del' onClick={() => handleDelete(item.id)}><MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
