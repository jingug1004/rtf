import React, { useEffect, useState } from "react";
import {
  Paper,
  List,
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  Link,
} from "@mui/material";
import { apiLoad } from "../api/hello";
import useRouter from "next/router";
import { getCookie, setCookie } from "../../plainCookie";

const ACCESS_TOKEN = "ACCESS_TOKEN";

const signUp = () => {
  const router = useRouter;

  // const [temp, setTemp] = useState(reqData.con);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    signup({ email: email, username: username, password: password });
  };

  const signup = (userDTO) => {
    apiLoad("/auth/signUp", "POST", userDTO).then((response) => {
      router.push("/login");
    });
  };

  return (
    <Container component={"main"} maxWidth={"xs"} style={{ marginTop: "8%" }}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component={"h1"} variant={"h5"}>
              계정 생성
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete={"username"}
              name={"username"}
              variant={"outlined"}
              required
              fullWidth
              id={"username"}
              label={"사용자 이름"}
              autoFocus
            />
          </Grid>
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
              name={"password"}
              label={"패스워드"}
              type={"password"}
              id={"password"}
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
              계정 생성
            </Button>
          </Grid>
          {/*<Grid container justifyContent={"flex-end"}>*/}
          <Grid item xs={12}>
            <Link href={"/login"} variant={"body2"}>
              이미 계정이 있습니까? 로그인 하세요.
            </Link>
          </Grid>
          {/*</Grid>*/}
        </Grid>
      </form>
    </Container>
  );
};

// export const getServerSideProps = async ({ req, res, params }) => {
// if (!req.headers.referer) {
//   res.statusCode = 302;
//   res.setHeader("Location", `/`); // Replace <link> with your url link
//   res.end();
// }
// return { props: {} };
// };

export default signUp;
