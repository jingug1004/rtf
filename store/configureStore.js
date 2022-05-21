import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga"; // redux-saga를 생성하기 위한 라이브러리
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import withReduxSaga from "next-redux-saga"; // next와 redux-saga를 연결하기 위한 라이브러리
import rootSaga from "../saga/rootSaga"; // sagas의 index.js를 가지고온다.
import reducer from "../reducer/rootReducer";

//생략 가능 Dependency를 최소화 하기 위해 withReduxSaga 지움.
/*
wrapper(_app.js를 감싸고 있음)로 개별 페이지의 SSR을 적용함.
기존에 next에서 SSR 렌더링용 메서드를 4가지 정도 지원하고 있는데,
Redux랑 사용할 때는 문제가 있어서 Next-Redux-Wrapper가 제공하는 SSR 렌더링용 메서드와
같이 사용하려 한다.
*/

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware(); // 리덕스 사가 생성
  const middlewares = [sagaMiddleware]; // 미들웨어 연결
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancer); // enhancer에 넣어서 saga가 적용된 store 생성
  store.sagaTask = sagaMiddleware.run(rootSaga); // store에 rootSaga를 넣은 sagaMiddleware를 실행시켜준다.
  return store;
};
// export default withRedux(configureStore)(Test);를 아래와 같이 변경

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
