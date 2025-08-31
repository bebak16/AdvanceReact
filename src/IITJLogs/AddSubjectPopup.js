import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
} from "@mui/material";


const AddSubjectPopup = ({ open, onClose, addNewSubject }) => {
  const [subjectName, setSubjectName] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleAddToList = () => {
    if (subjectName) {
      setSubjects([...subjects, { name: subjectName }]);
      setSubjectName("");
    }
  };

  const handleSubmitAll = () => {
    if (subjects.length > 0) {
      addNewSubject(subjects);
      setSubjects([]);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "500px",
          height: "500px",
        },
      }}
    >
      <DialogTitle>Add Multiple Subjects</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Subject Name"
          fullWidth
          placeholder="1-DSAT"
          variant="outlined"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <Button
          onClick={handleAddToList}
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 , minWidth: 150 }}
          disabled={!subjectName}
        >
          Add to List
        </Button>

        {subjects.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <strong style={{ marginBottom: "10px"}}>Subjects to be added:</strong>
            <Box component="ul" sx={{ listStyle: "none",  mt: 2, p: 0, m: 0 }}>
              {subjects.map((subj, idx) => (
                <Box
                  key={idx}
                  component="li"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    p: 1,
                    borderRadius: "8px",
                    background: "#f7f7f7",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      marginRight: 2,
                      display: "inline-block",
                    }}
                  />
                  <span style={{ fontWeight: 500, fontSize: "1rem", marginRight: 8 }}>{subj.name}</span>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" color="secondary" sx={{ minWidth: 100 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmitAll}
          variant="contained"
          color="primary"
          disabled={subjects.length === 0}
          sx={{ minWidth: 120 }}
        >
          Add All
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubjectPopup;
