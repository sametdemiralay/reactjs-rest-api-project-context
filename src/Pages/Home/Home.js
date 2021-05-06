import { useState, useEffect, useContext } from "react";
import {GlobalContext} from '../../Context/GlobalState'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import NotesCard from "./NotesCard";

const useStyles = makeStyles(() => ({
  searchArea: {
    marginBottom: "20px",
  }
}));

const Home = () => {
  const classes = useStyles();
  const { books, getData } = useContext(GlobalContext);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getData(searchText);
  }, [searchText]);

  return (
    <Grid container>
      <Grid item xs={12} className={classes.searchArea}>
        <TextField
        color="primary"
          id="outlined-basic"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          label="Search"
          variant="outlined"
          fullWidth
        />
      </Grid>
      {books.length > 0 ? (
        books.map((item, index) => (
          <NotesCard item={item} key={index} />
        ))
      ):(
        <p>data yok</p>
      )}
    </Grid>
  )
}

export default Home
