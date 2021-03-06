import Todo from "./todo";
import AddTodo from "./addTodo";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  List,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { apiLoad } from "./api/hello";
import axios from "axios";
import Link from "next/link";
import Box from "@mui/material/Box";
import useRouter from "next/router";
import { deleteCookie, getCookie } from "../plainCookie";
import wrapper from "../store/configureStore";

const ACCESS_TOKEN = "ACCESS_TOKEN";

const Home = (itemsGetInit) => {
  const router = useRouter;

  const [items, setItems] = useState(itemsGetInit);
  const [loading, setLoading] = useState(true);
  const [isAccessToken, setIsAccessToken] = useState(false);
  console.log("l~ itemsGetInit : \n", itemsGetInit);
  console.log(
    "l~ const [items, setItems] = useState(itemsGetInit) : \n",
    items
  );

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

  const signout = () => {
    localStorage.setItem(ACCESS_TOKEN, null);
    // setCookie("ACCESS_TOKEN", response.token, 0.1);

    // const date = new Date();
    // document.cookie =
    //   name + "= " + "; expires=" + date.toUTCString() + "; path=/";
    deleteCookie(ACCESS_TOKEN);
    router.push("/login");
  };

  useEffect(() => {
    console.log("l~ useEffect items : ", items);
    console.log("l~ useEffect itemsGetInit items : ", itemsGetInit);
    if (itemsGetInit.statCod === 403) {
      console.log("l~ error itemsGetInit : ", itemsGetInit);
      router.push("/login");
    }

    if (items !== [] || items.length > 0) {
      setLoading(false);
    }

    const a02 = localStorage.getItem(ACCESS_TOKEN);
    if (a02 !== null || a02 !== "") {
      setIsAccessToken(true);
    }
  }, [items]);

  const todoItems = items !== undefined && items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item, idx) => (
          <Todo item={item} key={item.id} del={del} upd={upd} />
        ))}
      </List>
    </Paper>
  );

  const NavigationBar = () => (
    <AppBar position={"static"}>
      <Toolbar>
        <Grid justifyContent={"space-between"} container>
          <Grid item>
            <Typography variant={"h6"}>????????? ??????</Typography>
          </Grid>
          <Grid>
            <Button color={"inherit"} onClick={signout}>
              ????????????
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
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

  const todoListPage = (
    <div>
      <NavigationBar />
      <Container maxWidth={"md"}>
        {/*{!isAccessToken && (*/}
        {/*  <Link href={"/login"}>*/}
        {/*    <a />*/}
        {/*  </Link>*/}
        {/*)}*/}
        <AddTodo add={add} />
        <div className={"TodoList"}>{todoItems} </div>
      </Container>
      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );

  let content = <h1> ?????? ???... </h1>;

  if (!loading) {
    content = todoListPage;
  }

  console.log("l~ loading : ", loading);

  return <div className={"App"}>{content}</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      // export const getServerSideProps = async ({ req }) => {
      let accessToken = "";
      console.log("l~ getInitialProps req : ", accessToken);

      const vHeaders = req.headers;

      // const getCookie = (name) => {
      //   const value = vHeaders.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      //   return value ? value[2] : null;
      // };
      console.log("l~ vHeaders : ", vHeaders);

      accessToken = getCookie(vHeaders, ACCESS_TOKEN);

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
          itemsGetInit = response.data.data;
        })
        .catch((error) => {
          console.log(
            "l~ start ================================================== "
          );
          console.log(error.response);
          console.log(
            "l~ end ================================================== "
          );

          let errorRes = {};
          if (error.response.status === 403) {
            console.log("l~ error itemsGetInit : ", itemsGetInit);
            errorRes["statCod"] = 403;
            errorRes["data"] = [];
          }
          error.response.data = [];
          itemsGetInit = errorRes;
          console.log("l~ error 2 itemsGetInit : ", itemsGetInit);
        });
      console.log("l~ data loaded : ", itemsGetInit);
      return { props: { itemsGetInit } };
    }
);

export default Home;

//

// import React, { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadTvShowRequestAction } from "../reducer/tvShow"; // tvShow ??????????????? ?????? ??????
//
// const Home = () => {
//   const dispatch = useDispatch();
//   const { tvShowTitle, tvShowContents } = useSelector((state) => state.tvShow); // tvShow redux??? state?????? ????????????.
//
//   const onClickHero = useCallback(
//     (hero) => () => {
//       dispatch(loadTvShowRequestAction(hero));
//     },
//     []
//   ); // hero ????????? ???????????? data??? ??????????????? action ??????????????? ????????????.
//
//   return (
//     // ??????????????? ?????? ????????? ????????? onClick??? ????????????.
//     <div>
//       <button onClick={onClickHero("superman")}>?????????</button>
//       <button onClick={onClickHero("batman")}>?????????</button>
//       {tvShowTitle && <div>{tvShowTitle}</div>}
//       <br />
//       {tvShowContents && (
//         <div>
//           {tvShowContents.map((show) => (
//             <div key={show.id}>
//               <a href={show.url}>{show.name}</a>
//               <div>?????? : {show.score}</div>
//               <div>?????? : {show.type}</div>
//               <div>?????? : {show.language}</div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default Home;
