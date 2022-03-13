import React, { useState } from "react";
import { Button, Grid, Paper, TextField } from "@mui/material";

const AddTodo = (props) => {
  const [addTodoItem, setAddTodoItem] = useState({ title: "" });
  console.log("l~ AddTodo.js ", addTodoItem);

  const onInputChange = (e) => {
    setAddTodoItem({ ...addTodoItem, title: e.target.value });
  };

  const onButtonClick = () => {
    props.add(addTodoItem);
    setAddTodoItem({ ...addTodoItem, title: "" });
  };

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      onButtonClick();
    }
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder={"Add Todo here"}
            fullWidth
            onChange={onInputChange}
            value={addTodoItem.title}
            onKeyPress={enterKeyEventHandler}
          />
        </Grid>
        <Grid xs={1} md={1} item>
          <Button
            fullWidth
            color={"secondary"}
            variant={"outlined"}
            style={{ minHeight: "55px" }}
            onClick={onButtonClick}
          >
            +
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddTodo;
