import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Todo from "../pages/Todo";
import AddTodo from "../pages/AddTodo";
import { useEffect, useState } from "react";
import { Paper, List, Container } from "@mui/material";

export default function Home() {
  const [items, setItems] = useState([
    // { id: "ID-0", title: "HW1", done: true },
    // { id: "ID-1", title: "HW2", done: false },
  ]);

  const add = (item) => {
    const vSeq = "ID-" + items.length;
    // setItems([...items, { id: vSeq, title: item.title, done: false }]);
    setItems(items.concat({ id: vSeq, title: item.title, done: false }));
    console.log("l~ items   const add = (item) => {\n : ", items);
  };

  const del = (item) => {
    const newItems = items.filter((e) => e.id !== item.id);
    setItems(newItems);
  };

  const upd = (item) => {
    setItems(items.map((it, idx) => (it.id === item.id ? item : it)));
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
}
