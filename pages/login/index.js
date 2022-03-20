import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Container,
  List,
  Typography,
} from "@mui/material";
import { apiLoad } from "../api/hello";
import useRouter from "next/router";
import { getCookie, setCookie } from "../../plainCookie";

const ACCESS_TOKEN = "ACCESS_TOKEN";

const login = () => {
  const router = useRouter;

  // const [temp, setTemp] = useState(reqData.con);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");
    signin({ email: email, password: password });
  };

  const signin = (userDTO) => {
    apiLoad("/auth/signin", "POST", userDTO).then((response) => {
      console.log("l~ /auth/signin response : ", response);
      if (response.token) {
        localStorage.setItem(ACCESS_TOKEN, response.token);
        setCookie(ACCESS_TOKEN, response.token, 0.1);
        // setTemp(response.token);
        router.push("/");
      }
    });
  };

  // useEffect(() => {
  // const a01 = localStorage.getItem(ACCESS_TOKEN);
  // if (temp !== null || temp !== "") {
  //   router.push("/");
  // }
  // }, []);

  return (
    <Container component={"main"} maxWidth={"xs"} style={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component={"h1"} variant={"h5"}>
            로그인
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        {" "}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant={"outlined"}
              required
              fullWidth
              id={"email"}
              label={"이메일 주소"}
              name={"email"}
              autoComplete={"email"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant={"outlined"}
              required
              fullWidth
              type={"password"}
              id={"password"}
              label={"패스워드"}
              name={"password"}
              autoComplete={"current-password"}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type={"submit"}
              fullWidth
              variant={"contained"}
              color={"primary"}
            >
              로그인
            </Button>
          </Grid>
          {/*<Link href={"/signup"} variant={"body2"}>*/}
          {/*  <Grid item>계정이 없습니까? 여기서 가입 하세요.</Grid>*/}
          {/*</Link>*/}
        </Grid>
      </form>
    </Container>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
  // let reqData;
  //
  // const vHeaders = req.headers;
  // const accessToken = getCookie(vHeaders, ACCESS_TOKEN);
  // console.dir(req);
  // console.log("l~ vHeaders : ", vHeaders);
  // console.log("l~ accessToken : ", accessToken);
  // reqData = { con: accessToken };
  //
  // return { props: { reqData } };
  if (!req.headers.referer) {
    res.statusCode = 302;
    res.setHeader("Location", `/`); // Replace <link> with your url link
    res.end();
  }
  return { props: {} };
};

export default login;
