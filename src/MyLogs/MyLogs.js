import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
import "./MyLogs.css";

const styles = {
  input: {
    width: "30em",
    height: "4em",
  },

  inputDate: {
    width: "8em",
    height: "4em",
    marginLeft: "10px",
  },

  noteCell: {
    width: "20em",
  },

  button: {
    width: "9em",
    height: "4.5em",
    fontSize: "12px",
    marginLeft: "10px",
  },
};

const MSG = "Please save changes after updating your log.";

const lightColors = [
  "#bfefff", // Light blue
  "#c1ffc1", // Light green
  "#fafbf5", // Light
  "#d2b48c", // Tan
  "#fffacd", // Lemon chiffon
  "#e0ffff", // Light cyan
  "#f0fff0", // Honeydew
  "#fafad2", // Light goldenrod yellow
  "#f0e68c", // Khaki
  "#f5deb3", // Wheat
];

function MyLogs() {
  const [logsList, setLogsList] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(MSG);
  const todayDate = moment(new Date()).format("YYYY/MM/DD");
  const [dateValue, setDateValue] = useState(todayDate);

  const { data, updateList } = useFireBase("logs");

  useEffect(() => {
    if (data.length > 0) {
      setLogsList(data);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTextValue(value);
  };
  const handleDateChange = (e) => {
    const date = e.target.value;
    setDateValue(date);
  };

  const handleGetColor = () => {
    const log = logsList.find((itr) => itr.date === dateValue);

    if (log) {
      return log.color;
    }
    const newKey = Math.floor(Math.random() * 10);
    return lightColors[newKey];
  };

  const addNoteToList = () => {
    const newId = Math.floor(Math.random() * 1000);
    const getColor = handleGetColor();
    const noteValues = {
      id: newId,
      text: textValue,
      checked: false,
      gmail: 0,
      color: getColor,
      comments: "",
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

  const handleIDChange = (gmailId, value) => {
    const checkedList = logsList.map((itr) => {
      if (itr.id === gmailId) itr.gmail = value;
      return itr;
    });
    setLogsList(checkedList);
    handleSnackbarClick();
  };

  const handleCommentChange = (commentId, e) => {
    if (e.key === "Enter") {
      const checkedList = logsList.map((itr) => {
        if (itr.id === commentId) itr.comments = e.target.value;
        return itr;
      });
      setLogsList(checkedList);
      handleSnackbarClick();
    }
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
    <div>
      <section>
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
          <Table
            sx={{ minWidth: 400 }}
            aria-label="simple table"
            className="table"
          >
            <TableHead>
              <TableRow>
                <TableCell>SN</TableCell>
                <TableCell style={styles.noteCell}>Log</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Done</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logsList.map((note, index) => (
                <TableRow
                  key={note.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ backgroundColor: note.color }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row" style={styles.noteCell}>
                    {note.text}
                  </TableCell>
                  <TableCell>{note.date}</TableCell>
                  <TableCell>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 60 }}
                      size="small"
                    >
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={note.gmail}
                        label="Gmail id"
                        onChange={(e) =>
                          handleIDChange(note.id, e.target.value)
                        }
                      >
                        <MenuItem value={0}>vats</MenuItem>
                        <MenuItem value={1}>rai</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={note.checked}
                      onChange={() => handleCheckBox(note.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      hiddenLabel
                      defaultValue={note.comments}
                      onKeyDown={(e) => handleCommentChange(note.id, e)}
                      size="small"
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
    </div>
  );
}

export default MyLogs;
