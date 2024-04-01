import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useFireBase from "../utils/useFireBase";

const styles = {
  section: {
    margin: "20px 30px",
  },

  input: {
    width: "20em",
  },

  inputDate: {
    width: "8em",
    marginLeft: "20px",
  },

  noteCell: {
    minWidth: "15em",
  },

  button: {
    width: "8em",
    height: "4em",
    fontSize: "12px",
    marginLeft: "2em",
  },
};

const MSG = "Please save changes after updating your log.";

function MyLogs() {
  const [logsList, setLogsList] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(MSG);
  const todayDate = moment(new Date()).format("DD/MM/YYYY");
  const [dateValue, setDateValue] = useState(todayDate);

  const { data, updateList } = useFireBase("logs");

  useEffect(() => {
    if (data) setLogsList(data);
  }, [data]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTextValue(value);
  };
  const handleDateChange = (e) => {
    const date = e.target.value;
    setDateValue(date);
  };

  const addNoteToList = () => {
    const newId = Math.floor(Math.random() * 1000);
    const noteValues = {
      id: newId,
      text: textValue,
      checked: false,
      date: dateValue,
    };

    if (textValue) {
      const newLogsList = [...logsList, noteValues];
      newLogsList.sort((a, b) => new Date(a.date) - new Date(b.date));
      setLogsList(newLogsList);
    } else {
      setMessage("Please enter the logs/details.");
      setOpen(true);
    }
    setTextValue("");
    handleSnackbarClick();
  };

  const handleCheckBox = (checkedId) => {
    const checkedList = logsList.map((itr) => {
      if (itr.id === checkedId) itr.checked = !itr.checked;
      return itr;
    });
    setLogsList(checkedList);
    handleSnackbarClick();
  };

  const handleDelete = (deleteId) => {
    const newList = logsList.filter((itr) => itr.id !== deleteId);
    setLogsList(newList);
    handleSnackbarClick();
  };

  const saveNotes = () => {
    updateList(logsList);
    setMessage("Logs Saved Successfully!");
    handleSnackbarClick();
  };

  const handleSnackbarClick = () => {
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setMessage(MSG);
  };

  return (
    <main>
      <section style={styles.section}>
        <div>
          <TextField
            id="outlined-basic"
            label="Add a new log to list"
            variant="outlined"
            multiline
            value={textValue}
            onChange={handleInputChange}
            style={styles.input}
            autoFocus
          />
          <TextField
            id="date-field"
            label="Add a date"
            variant="outlined"
            value={dateValue}
            onChange={handleDateChange}
            style={styles.inputDate}
          />
          <Button
            variant="contained"
            onClick={addNoteToList}
            color="success"
            style={styles.button}
          >
            Add Log
          </Button>
          <Button
            variant="contained"
            onClick={saveNotes}
            color="success"
            style={styles.button}
          >
            Save Logs
          </Button>
        </div>
        <h2>My Logs</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell style={styles.noteCell}>Log</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Done</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logsList.map((note, index) => (
                <TableRow
                  key={note.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row" style={styles.noteCell}>
                    {note.text}
                  </TableCell>
                  <TableCell>{note.date}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={note.checked}
                      onChange={() => handleCheckBox(note.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(note.id)}>
                      <DeleteIcon sx={{ color: "black" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </main>
  );
}

export default MyLogs;
