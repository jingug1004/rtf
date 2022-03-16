import Todo from "../pages/Todo";
import AddTodo from "../pages/AddTodo";
import React, { useEffect, useState } from "react";
import { Container, List, Paper } from "@mui/material";
import { call } from "./api/hello";
import axios from "axios";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home = ({ itemsGetInit }) => {
  const [items, setItems] = useState(itemsGetInit);
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
    // **
    // const newItems = items.filter((e) => e.id !== item.id);
    call("/todo", "DELETE", item).then((response) => {
      setItems(response.data);
    });
  };

  const upd = (item) => {
    // **
    // setItems(items.map((it) => (it.id === item.id ? item : it)));
    call("/todo", "PUT", item).then((response) => {
      setItems(response.data);
    });
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

  const Copyright = () => {
    return (
      <Typography variant={"body2"} color={"textSecondary"} align={"center"}>
        {"Copyright @ "}
        ing engineer, {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  return (
    <div className={"App"}>
      <Container maxWidth={"md"}>
        <Link href={"/login"}>
          <a />
        </Link>
        <AddTodo add={add} />
        <div className={"TodoList"}>{todoItems} </div>
      </Container>
      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );
};

Home.getInitialProps = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  let itemsGetInit = [];

  await axios
    .get("http://localhost:8080/todo", requestOptions)
    .then((response) => {
      console.log("l~ getInitialProps response : ", response);
      itemsGetInit = response;
    })
    .catch((error) => {
      console.log("l~ api response error : ", error);
      if (typeof window !== "undefined") {
        console.log("l~ api 222222222 response error : ", error);
        window.location.href = "http://localhost:3000/login";
      }
    });
  console.log("l~ data loaded", itemsGetInit);
  return { itemsGetInit };
};

export default Home;
