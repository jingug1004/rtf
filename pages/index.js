import Todo from "../pages/Todo";
import AddTodo from "../pages/AddTodo";
import { useEffect, useState } from "react";
import { Paper, List, Container } from "@mui/material";
import handler, { call } from "./api/hello";
import axios from "axios";

const Home = ({ itemsGetInit }) => {
  const [items, setItems] = useState(itemsGetInit.data);
  console.log("l~ itemsGetInit : ", itemsGetInit);

  const add = (item) => {
    const vSeq = "ID-" + items.length;
    // **
    // setItems([...items, { id: vSeq, title: item.title, done: false }]);
    // setItems(items.concat({ id: vSeq, title: item.title, done: false }));
    call("/todo", "POST", item).then((response) => {
      console.log("l~ todo post : ", response);
      setItems(response.data);
    });
    console.log("l~ items   const add = (item) => {\n : ", items);
  };

  const del = (item) => {
    const newItems = items.filter((e) => e.id !== item.id);
    setItems(newItems);
  };

  const upd = (item) => {
    setItems(items.map((it) => (it.id === item.id ? item : it)));
  };

  useEffect(() => {
    console.log("l~ useEffect items : ", items);
  }, [items]);

  const todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item, idx) => (
          <Todo item={item} key={item.id} del={del} upd={upd} />
        ))}
      </List>
    </Paper>
  );

  return (
    <div className={"App"}>
      <Container maxWidth={"md"}>
        <AddTodo add={add} />
        <div className={"TodoList"}>{todoItems} </div>
      </Container>
    </div>
  );
};

Home.getInitialProps = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const { data: itemsGetInit } = await axios.get(
    "http://localhost:8080/todo",
    requestOptions
  );
  console.log("l~ data loaded", itemsGetInit);
  return { itemsGetInit };
};

export default Home;
