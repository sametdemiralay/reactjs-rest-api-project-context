import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalState";

const Home = () => {
  const {
    books,
    error,
    postData,
    getSingleData,
    singleData,
    deleteData,
    putData
  } = useContext(GlobalContext);

  useEffect(() => {
    getSingleData(5);
  }, []);

  console.log(singleData);

  return (
    <div>
      <p>HOME PAGE</p>

      <p>--</p>

      <p>data yı listeleme:</p>
      {books.length > 1 ? <p>geldi</p> : <p>yok mk {error} </p>}

      {books.map((a) => (
        <div key={a.id}>
          <p>{a.author}</p>
        </div>
      ))}

      <p>--</p>

      <p>veri ekleme butonu:</p>
      <p
        onClick={() =>
          postData({
            author: "asd",
            title: "asd2",
            summary: "asd3",
            type: "asd4",
          })
        }
      >
        VERİ EKLEME
      </p>

      <p>--</p>

      <p>single data title:</p>
      <p>{singleData.title}</p>

      <p>--</p>

      <p>silme butonu:</p>
      <p onClick={() => deleteData(8)}>silme butonu</p>

      <p>--</p>

      <p>update butonu:</p>
      <p onClick={() => putData(8,{
            author: "yark",
            title: "yark",
            summary: "asyarkd3",
            type: "yark",
          })}>update</p>
    </div>
  );
};

export default Home;
