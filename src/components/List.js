import React, { useState } from 'react';

const List = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.item);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(props.item);
  };

  const handleSaveEdit = () => {
    if (editedText.trim() !== '') {
      props.editItem(editedText, props.index);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  if (isEditing) {
    return (
      <li className="list-item">
        <input
          type="text"
          className="edit-input"
          value={editedText}
          onChange={handleChange}
        />
        <span className="icons">
          <i className="fa-solid fa-check icon-save" onClick={handleSaveEdit}></i>
          <i className="fa-solid fa-times icon-cancel" onClick={handleCancelEdit}></i>
        </span>
      </li>
    );
  } else {
    return (
      <li className="list-item">
        {props.item}
        <span className="icons">
          <i className="fa-solid fa-trash-can icon-delete" onClick={() => props.deleteItem(props.index)}></i>
          <i className="fa-solid fa-pen-to-square icon-edit" onClick={handleEdit}></i>
        </span>
      </li>
    );
  }
};

export default List;
