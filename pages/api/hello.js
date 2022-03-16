// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { API_BASE_URL } from "../../app-config";
import axios from "axios";

export default function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  // **
  // fetch("http://localhost:8080/todo", requestOptions)
  //   .then((response) => response.json())
  //   .then(
  //     (response) => {
  //       // setItems(response.data);
  //       console.log("l~ fetch success : ", response.data);
  //       return response.data;
  //     },
  //     (error) => {
  //       console.log("l~ fetch error : ", error);
  //       // setItems(error);
  //     }
  //   );
}

/**
 * call 메서드
 *
 * @param api /tod0
 * @param method GET/POST/PUT/DELETE
 * @param req 추가, 수정, 삭제하는 선택 단일값
 * @returns {Promise<AxiosResponse<any>>} axios api 호출 후 결과값(보통은 id에 대한 조회값)
 */
export function call(api, method, req) {
  const options = {
    // **
    // headers: new Headers({
    //   "Content-Type": "application/json",
    // }),
    headers: {
      "Content-Type": "application/json",
    },
    url: API_BASE_URL + api,
    method: method,
  };

  if (req) {
    // GET method
    // options.body = JSON.stringify(req);
    options.data = req;
  }

  // **
  // return fetch(options.url, options).then((response) =>
  return axios(options)
    .then((response) => {
      console.log("l~ api response : ", response);
      return response.data;
    })
    .catch((error) => {
      console.log("l~ api response error : ", error);
      if (error === 403) {
        window.location.href = "http://localhost:3000/login";
      }
    });
}
