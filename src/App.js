import React, { useState, useEffect } from 'react';
import "./App.css";
import TodoInput from './components/TodoInput';
import List from './components/List';

function App() {
  // Function to retrieve the todo list from local storage
  const getLocalStorage = () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  const [listTodo, setListTodo] = useState(() => {
    return getLocalStorage();
  });

  // Update the local storage whenever the todo list changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(listTodo));
  }, [listTodo]);

  const addList = (inputText, indexToEdit = null) => {
    if (inputText.trim() !== '') {
      if (indexToEdit !== null) {
        let newListTodo = [...listTodo];
        newListTodo[indexToEdit] = inputText;
        setListTodo(newListTodo);
      } else {
        setListTodo([...listTodo, inputText]);
      }
    }
  };

  const deleteListItem = (key) => {
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo(newListTodo);
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList} />
        <h1 className="app-heading">TODO</h1>
        <hr />
        {listTodo.map((listItem, i) => {
          return (
            <List key={i} index={i} item={listItem} deleteItem={deleteListItem} editItem={addList} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
