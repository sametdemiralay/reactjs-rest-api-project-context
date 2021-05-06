import React, { createContext, useReducer, useEffect, useState } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// initial state
const initialState = {
  loading: true,
  error: "",
  books: [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [singleData, setSingleData] = useState([])

  useEffect(() => {
    getData();
  }, []);

  // ---ACTIONS---
  // get
  const getData = (text) => {
    let uri = "http://localhost:3400/books";
    if(text){
      uri += `?q=${text}`
    }
    axios
      .get(uri)
      .then((response) => {
        dispatch({ type: "GET_DATA_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_DATA_ERROR" });
      });
  };
  // get single
  const getSingleData = (id) => {
    axios.get(`http://localhost:3400/books/${id}`)
    .then((response) => {
      setSingleData(response.data)
    })
  };
  // post / create
  const postData = (bookItem) => {
    axios.post("http://localhost:3400/books", bookItem);
  };
  // delete
  const deleteData = (id) => {
    axios.delete(`http://localhost:3400/books/${id}`);
  };
  // put / update
  const putData = (id,updateBook) => {
    axios.put(`http://localhost:3400/books/${id}`, updateBook);
  };

  return (
    <GlobalContext.Provider
      value={{
        books: state.books,
        error: state.error,
        postData,
        getSingleData,
        singleData,
        deleteData,
        putData,
        getData
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
