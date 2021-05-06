const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA_SUCCESS":
      return {
        loading: false,
        error: "",
        books: action.payload
      };
    case "GET_DATA_ERROR":
      return {
        loading: false,
        error: "someting went wrong!",
        books: []
      };
    default:
      return state;
  }
};

export default AppReducer;