import { useState, useEffect, useContext } from "react";
import {GlobalContext} from '../../Context/GlobalState'
import { makeStyles, FormControlLabel } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import TextField from "@material-ui/core/TextField";
import { useParams, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttonsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& button": {
      marginRight: "20px",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formWrapper: {
    "& button": {
      display: "flex",
    },
  },
  field: {
    marginBottom: "15px",
  },
}));

const Detail = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const { getSingleData, singleData, deleteData, putData } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryError, setSummaryError] = useState(false);
  const [author, setAuthor] = useState("");
  const [authorError, setAuthorError] = useState(false);
  const [type, setType] = useState("Comic Book");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // delete data
  const deleteNote = () => {
    deleteData(id);
    history.push("/");
  };

  // update data
  const updateData = (e) => {
    e.preventDefault();
    setTitleError(false);
    setSummaryError(false);
    setAuthorError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (summary === "") {
      setSummaryError(true);
    }
    if (author === "") {
      setAuthorError(true);
    }

    if (title && summary && author) {
      putData(id,{author, title, summary, type});
      history.push("/");
    }
  };

  useEffect(() => {
    getSingleData(id);
  }, []);

  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom>
            {singleData.title}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Author: {singleData.author}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Type: {singleData.type}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {singleData.summary}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.buttonsWrapper}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CreateIcon />}
            onClick={handleOpen}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={deleteNote}
          >
            Delete
          </Button>
        </Grid>
      </Grid>

      {/* modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form noValidate autoComplete="off" className={classes.formWrapper}>
              <TextField
                className={classes.field}
                label="Book Title"
                variant="outlined"
                color="secondary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={titleError}
                fullWidth
                required
              />
              <TextField
                className={classes.field}
                label="Author"
                variant="outlined"
                color="secondary"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                error={authorError}
                fullWidth
                required
              />
              <TextField
                className={classes.field}
                label="Summary"
                variant="outlined"
                color="secondary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                error={summaryError}
                multiline
                rows={4}
                fullWidth
                required
              />

              <FormControl className={classes.field}>
                <FormLabel>Note Category</FormLabel>
                <RadioGroup
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <FormControlLabel
                    value="Literature"
                    control={<Radio />}
                    label="Literature"
                  />
                  <FormControlLabel
                    value="Comic Book"
                    control={<Radio />}
                    label="Comic Book"
                  />
                  <FormControlLabel
                    value="Philosophy"
                    control={<Radio />}
                    label="Philosophy"
                  />
                  <FormControlLabel
                    value="Science"
                    control={<Radio />}
                    label="Science"
                  />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
                onClick={updateData}
              >
                Update
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </Container>
  )
}

export default Detail
