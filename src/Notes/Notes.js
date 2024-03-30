import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import useFireBase from '../utils/useFireBase';

const styles = {

  section: {
    margin: "20px 30px",
  },

  button: {
    width: "10em",
    height: "4em",
  },

  input: {
    width: "30em"
  },

  noteCell: {
    minWidth: "10em"
  },
  saveBtn: {
    width: "10em",
    height: "4em",
    marginLeft: "4em",
  },

}


function Notes() {
  const [noteList, setNoteList] = useState([]);
  const [textValue, setTextValue] = useState("");

  const { data, loading, updateList } = useFireBase();

  useEffect(() => {
    if(data) 
    setNoteList(data)

  }, [data])

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTextValue(value);
  }

  const addNoteToList = () => {
    const newId = Math.floor(Math.random() * 1000);
    const noteValues = { id: newId, text: textValue, checked: false}

    if (textValue) {
      setNoteList(prev => [...prev, noteValues])
    }
    setTextValue("");
  }

  const handleCheckBox = (checkedId) => {
    const checkedList = noteList.map(itr => {
      if(itr.id === checkedId) itr.checked = !itr.checked;
      return itr;
    })
    setNoteList(checkedList);
  }

  const handleDelete = (deleteId) => {
    const newList = noteList.filter(itr => itr.id !== deleteId)
    setNoteList(newList);
  }

  return (
    <main>
      <section style={styles.section}>
        <TextField 
          id="outlined-basic" 
          label="Add a new note to list" 
          variant="outlined" 
          multiline
          value={textValue}
          onChange={handleInputChange}
          style={styles.input}
          autoFocus
          />
        <Button variant="contained" onClick={addNoteToList} color="success" style={styles.button}>
          Add Note
        </Button>
        <Button 
          variant="contained" 
          onClick={() => updateList(noteList)} 
          color="success"
          style={styles.saveBtn}
        >
          Save Notes
        </Button>
        <h2> My Notes</h2>
        { loading && <h4>Loading...</h4> }
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Done</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {noteList.map((note, index) => (
                <TableRow
                  key={note.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row" style={styles.noteCell}>
                    {note.text}
                  </TableCell>
                  <TableCell>
                  <Checkbox
                    checked={note.checked}
                    onChange={() => handleCheckBox(note.id)}
                  />
                  </TableCell>
                  <TableCell>
                  <IconButton onClick={() => handleDelete((note.id))}>
                    <DeleteIcon sx={{ color: "black" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </main>
  );
}

export default Notes;
