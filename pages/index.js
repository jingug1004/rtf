import Todo from "../pages/Todo";
import AddTodo from "../pages/AddTodo";
import React, { useEffect, useState } from "react";
import { Container, List, Paper } from "@mui/material";
import { apiLoad } from "./api/hello";
import axios from "axios";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useRouter from "next/router";

const ACCESS_TOKEN = "ACCESS_TOKEN";

const Home = ({ itemsGetInit }) => {
  const router = useRouter;

  const [items, setItems] = useState(itemsGetInit.data);
  console.log("l~ itemsGetInit : ", itemsGetInit.data);

  const add = (item) => {
    const vSeq = "ID-" + items.length;
    // **
    // setItems([...items, { id: vSeq, title: item.title, done: false }]);
    // setItems(items.concat({ id: vSeq, title: item.title, done: false }));
    apiLoad("/todo", "POST", item).then((response) => {
      console.log("l~ todo post : ", response);
      setItems(response.data);
    });
    console.log("l~ items   const add = (item) => {\n : ", items);
  };

  const del = (item) => {
    // **
    // const newItems = items.filter((e) => e.id !== item.id);
    apiLoad("/todo", "DELETE", item).then((response) => {
      setItems(response.data);
    });
  };

  const upd = (item) => {
    // **
    // setItems(items.map((it) => (it.id === item.id ? item : it)));
    apiLoad("/todo", "PUT", item).then((response) => {
      setItems(response.data);
    });
  };

  useEffect(() => {
    console.log("l~ useEffect items : ", items);
    if (itemsGetInit.status === 403) {
      console.log("l~ error itemsGetInit : ", itemsGetInit);
      router.push("/login");
    }
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

export const getServerSideProps = async ({ req }) => {
  let accessToken = "";
  console.log("l~ getInitialProps req : ", accessToken);

  const vHeaders = req.headers;

  const getCookie = (name) => {
    const value = vHeaders.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? value[2] : null;
  };

  accessToken = getCookie(ACCESS_TOKEN);

  vHeaders["Content-Type"] = "application/json";
  vHeaders["Authorization"] = `Bearer ${accessToken}`;

  console.log("l~ vHeaders req : ", vHeaders);

  const requestOptions = {
    method: "GET",
    headers: vHeaders,
  };

  console.log(
    "l~ vHeaders JSON.stringify( req : ",
    JSON.stringify(requestOptions)
  );

  let itemsGetInit;

  await axios
    .get("http://localhost:8080/todo", requestOptions)
    .then((response) => {
      console.log("l~ getInitialProps response : ", response);
      itemsGetInit = response.data;
    })
    .catch((error) => {
      itemsGetInit = error;
    });
  console.log("l~ data loaded : ", itemsGetInit);
  return { props: { itemsGetInit } };
};

export default Home;
