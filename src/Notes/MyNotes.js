import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useFireBase from '../utils/useFireBase';

const styles = {

  section: {
    margin: "20px 30px",
  },

  input: {
    width: "30em"
  },

  saveBtn: {
    width: "10em",
    height: "4em",
    margin: "3em",
  },

}

function MyNotes() {
  const [textValue, setTextValue] = useState("");

  const { data, updateList } = useFireBase();

  useEffect(() => {
    if (data)
      setTextValue(data)

  }, [data])

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTextValue(value);
  }

  return (
    <main>
      <section style={styles.section}>
        <h2>Important Notes</h2>
        <TextField
          id="outlined-basic"
          label="Add a new note to list"
          variant="outlined"
          multiline
          minRows={4}
          value={textValue}
          onChange={handleInputChange}
          style={styles.input}
          autoFocus
        />
        <Button
          variant="contained"
          onClick={() => updateList(textValue)}
          color="success"
          style={styles.saveBtn}
        >
          Save Notes
        </Button>
      </section>
    </main>
  );
}

export default MyNotes;
