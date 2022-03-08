import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";

const Todo = (props) => {
  const [todoItem, setTodoItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  console.log("l~ Todo.js ", todoItem);

  const doneOnChange = () => {
    setTodoItem({ ...todoItem, done: !todoItem.done });
  };

  const deleteEventHandler = () => {
    props.del(todoItem);
  };

  const offReadOnlyMode = () => {
    setReadOnly(false);
  };

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      setReadOnly(true);
    }
  };

  const editEventHandler = (e) => {
    setTodoItem({ ...todoItem, title: e.target.value });
  };

  useEffect(() => {
    console.log("l~ useEffect todoItem : ", todoItem);
    props.upd(todoItem);
  }, [todoItem]);

  return (
    <ListItem>
      <Checkbox checked={todoItem.done} onClick={doneOnChange} disableRipple />
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "naked", readOnly: readOnly }}
          type={"text"}
          id={todoItem.id}
          name={todoItem.id}
          value={todoItem.title}
          multiline={true}
          fullWidth={true}
          onClick={offReadOnlyMode}
          onKeyPress={enterKeyEventHandler}
          onChange={editEventHandler}
        />
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton aria-label={"Delete Todo"} onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
