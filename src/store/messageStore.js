import { createContext } from "react";

export const MessageContext = createContext({});

export const initialState = {
  type: "",
  title: "",
  text: "",
  clickCloseButton: false,
};

export const messageReducer = (state, action) => {
  switch (action.type) {
    case "POST_MESSAGE":
      return {
        ...action.payload,
      };
    case "CLEAR_MESSAGE":
      return {
        ...initialState,
      };
    case "CLEAR_MESSAGE_BY_BUTTON":
      return {
        ...initialState,
        clickCloseButton: true,
      };

    default:
      return state;
  }
};

export const handleSuccessMessage = (dispatch, res) => {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "success",
      title: "更新成功",
      text: res.data.message,
    },
  });
  setTimeout(() => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  }, 500);
};

export const handleErrorMessage = (dispatch, error) => {
  console.log(error.response.data);
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "failure",
      title: "失敗",
      text: Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message.join("、")
        : error?.response?.data?.message,
    },
  });
};
