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
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useFireBase from "../utils/useFireBase";
import { lightColors } from "../MyLogs/lightColours";
import "../MyLogs/MyLogs.css"
import { InputLabel } from "@mui/material";
const styles = {
  input: {
    marginRight: "1rem"
  },

  inputDate: {
    width: "12em",
    height: "4em",
    marginLeft: "1rem",
    marginRight: "1rem",
    marginTop: "5px"
  },
  selectWidth: {
    width: "8rem",
  },
  marginTop: {
    marginTop: "5px"
  },
  noteCell: {
    width: "15em",
  },
  marks: { width: "5rem" },
  date: {
    width: "7em",
  },

  button: {
    width: "9em",
    height: "4.5em",
    fontSize: "12px",
    marginLeft: "1rem",
  },
  button2: {
    width: "6em",
    height: "2.5em",
    fontSize: "12px",
    marginLeft: "1rem",
  },
};
const MSG = "Please save changes after updating your log.";

function LogsPage() {
  const [logsList, setLogsList] = useState([]);
  const [subject, setSubject] = useState("AI");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(MSG);
  const todayDate = new Date().toISOString().slice(0, 16);
  const [dateValue, setDateValue] = useState(todayDate);
  const [details, setDetails] = useState("");
  const [type, setType] = useState("Assignment");

  const { data, updateList } = useFireBase();

  const sortByDueDate = (arr) => {
    const data = Array.isArray(arr) ? arr : logsList;
    const sortedVal = [...data].sort((a, b) => {
      if (a.due != 0) return 1;  // Push 0 to the end
      if (b.due != 0) return -1; // Push 0 to the end
      return a.due - b.due;
    });
    setLogsList(sortedVal);
  }

  const sortBySubject = () => {
    const sortedSubjects = [...logsList].sort((a, b) => a.subject.localeCompare(b.subject));
    setLogsList(sortedSubjects);
  };

  const sortByType = () => {
    const sortedTypes = [...logsList].sort((a, b) => a.type.localeCompare(b.type));
    setLogsList(sortedTypes);
  };

  const sortByPercent = () => {
    const sortedPercent = [...logsList].sort((a, b) => {
      const percentA = a.percent ? parseInt(a.percent) : 0;  // Treat missing values as 0
      const percentB = b.percent ? parseInt(b.percent) : 0;
      return percentA - percentB;
    });
    setLogsList(sortedPercent);
  };

  useEffect(() => {
    if (data?.trackList) {
      const savedData = data.trackList;
      const updatedData = savedData.map(itr => {
        const dueDate = handleDueDate(itr.date);
        return { ...itr, due: dueDate }
      })
      sortByDueDate(updatedData);
    }
  }, [data]);

  const handleDetailsChange = (e) => {
    const value = e.target.value;
    setDetails(value);
  };
  const handleDateChange = (e) => {
    const date = e.target.value;
    setDateValue(date);
  };

  const addNoteToList = () => {
    const newId = Math.floor(Math.random() * 10000);
    const subjectColors = {
      AI: "#E6F7FF",   // Soft Baby Blue
      DSAT: "#FFEFD5", // Light Peach
      ODAS: "#F0FFF0", // Honeydew Green
      ML: "#FFD1DC"    // Blush Pink
    };
    let getColor = subjectColors?.[subject];

    const noteValues = {
      id: newId,
      subject: subject,
      checked: false,
      type: type,
      marks: "",
      percent: "",
      color: getColor,
      details: details,
      date: dateValue,
      due: handleDueDate(dateValue),
    };

    if (subject) {
      const newLogsList = [...logsList, noteValues];
      sortByDueDate(newLogsList);
    } else {
      setMessage("Please enter the logs/details.");
      setOpen(true);
    }
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
  const handleMarks = (id, e) => {
    const val = e.target.value;
    if (!val) return;

    const checkedList = logsList.map((itr) => {
      if (itr.id === id) {
        itr.marks = val
        const [numerator, denominator] = val.split("/").map(Number);
        itr.percent = `${Math.round((numerator / denominator) * 100)}%`
      }
      return itr;
    });
    setLogsList(checkedList);
    handleSnackbarClick();
  };

  const handleCommentChange = (commentId, e) => {
    const checkedList = logsList.map((itr) => {
      if (itr.id === commentId) itr.details = e.target.value;
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

  const handleDueDate = (ndate) => {
    const enteredDate = new Date(ndate);
    if (isNaN(enteredDate.getTime())) {
      return 0;
    }
    const today = new Date();
    const timeDiff = enteredDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if(daysDiff >= 0 ) return daysDiff;
    else null;
  };

  const saveNotes = () => {
    updateList({ ...data, trackList: logsList });
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
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 60 }}
            size="small"
            style={styles.selectWidth}
          >
            <InputLabel>Subject</InputLabel>
            <Select
              labelId="select-small-label"
              id="select-small"
              value={subject}
              label="Subject"
              onChange={(e) => setSubject(e.target.value)}
              autoFocus
            >
              <MenuItem value="AI">AI</MenuItem>
              <MenuItem value="DSAT">DSAT</MenuItem>
              <MenuItem value="ODAS">ODAS</MenuItem>
              <MenuItem value="ML">ML</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 60 }}
            size="small"
            style={styles.selectWidth}
          >
            <InputLabel>Type</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={type}
              label="typeId"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Quiz">Quiz</MenuItem>
              <MenuItem value="Assignment">Assignment</MenuItem>
              <MenuItem value="Exams">Exams</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="subject-details"
            label="Details"
            variant="standard"
            onBlur={handleDetailsChange}
            style={styles.marginTop}
            placeholder="Enter description"
          />
          <TextField
            id="date-field"
            label="Add a date"
            type="date"
            variant="standard"
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
        <h2>IITJ Assignment & Quiz Tracker</h2>
        <div>
          <strong>SORT BY :</strong>
          <Button
            variant="contained"
            onClick={sortBySubject}
            color="success"
            style={styles.button2}
          >
            Subject
          </Button>
          <Button
            variant="contained"
            onClick={sortByType}
            color="success"
            style={styles.button2}
          >
            Type
          </Button>
          <Button
            variant="contained"
            onClick={sortByPercent}
            color="success"
            style={styles.button2}
          >
            Percent
          </Button>
          <Button
            variant="contained"
            onClick={sortByDueDate}
            color="success"
            style={styles.button2}
          >
            Reset
          </Button>
          <p />
        </div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 400 }}
            aria-label="simple table"
            className="table"
          >
            <TableHead>
              <TableRow>
                <TableCell>SN</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Type</TableCell>
                <TableCell style={styles.noteCell}>Details</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Marks</TableCell>
                <TableCell>Percent</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Due Days</TableCell>
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
                  <TableCell>{logsList.length - index}</TableCell>
                  <TableCell component="th" scope="row">
                    {note.subject}
                  </TableCell>
                  <TableCell>
                    {note.type}
                  </TableCell>
                  <TableCell component="tr" scope="row" style={styles.noteCell}>
                    <TextField
                      hiddenLabel
                      defaultValue={note.details}
                      onBlur={(e) => handleCommentChange(note.id, e)}
                      size="small"
                      variant="standard"
                      className="details"
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={note.checked}
                      onChange={() => handleCheckBox(note.id)}
                    />
                  </TableCell>
                  <TableCell component="tr" scope="row">
                    <TextField
                      hiddenLabel
                      defaultValue={note.marks}
                      style={styles.marks}
                      onBlur={(e) => handleMarks(note.id, e)}
                      size="small"
                      variant="standard"
                      className="details"
                    />
                  </TableCell>
                  <TableCell>{note.percent}</TableCell>
                  <TableCell style={styles.date}>
                    {note.date.split("T")[0]} {note.date.split("T")[1]}
                  </TableCell>
                  <TableCell>
                    {note?.due == 0 ? "Today" : note.due}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(note.id)}
                      sx={{
                        color: "black",
                        width: "40px",
                        height: "40px"
                      }}
                    >
                      <DeleteIcon />
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

export default LogsPage;
