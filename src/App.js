import React, { useState } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRecycle } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [recycleBin, setRecycleBin] = useState([]);

  // Add new item to the to-do list
  let addList = (inputText) => {
    if (inputText !== '') setListTodo([...listTodo, inputText]);
  };

  // Move item to recycle bin
  const deleteListItem = (key) => {
    const deletedItem = listTodo[key];
    setRecycleBin([...recycleBin, deletedItem]);

    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  };

  // Restore item from recycle bin to to-do list
  const restoreItem = (key) => {
    const restoredItem = recycleBin[key];
    setListTodo([...listTodo, restoredItem]);

    let newRecycleBin = [...recycleBin];
    newRecycleBin.splice(key, 1);
    setRecycleBin([...newRecycleBin]);
  };

  // Permanently delete item from recycle bin
  const permanentlyDeleteItem = (key) => {
    let newRecycleBin = [...recycleBin];
    newRecycleBin.splice(key, 1);
    setRecycleBin([...newRecycleBin]);
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList} />
        <h1 className="app-heading">TODO</h1>
        <hr />
        {listTodo.length === 0 && <p>No tasks added!</p>}
        {listTodo.map((listItem, i) => (
          <TodoList key={i} index={i} item={listItem} deleteItem={deleteListItem} />
        ))}

        <h1 className="app-heading">Recycle Bin</h1>
        <hr />
        {recycleBin.length === 0 && <p>Recycle bin is empty!</p>}
        {recycleBin.map((recycleItem, i) => (
          <div key={i} className="recycle-item">
            <p>{recycleItem}</p>
            <button onClick={() => restoreItem(i)}>
              <FontAwesomeIcon icon={faRecycle} /> Restore
            </button>
            <button onClick={() => permanentlyDeleteItem(i)}>
              <FontAwesomeIcon icon={faTrash} /> Delete Permanently
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
