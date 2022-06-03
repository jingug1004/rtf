import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
// import count from "./count";
import tvShow from "./tvShow";

// const rootReducer = combineReducers({
//   // count,
//   tvShow,
// });

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        tvShow,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
