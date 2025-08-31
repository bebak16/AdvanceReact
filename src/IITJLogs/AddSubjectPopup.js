import React, { useState } from "react";
import { lightColors } from "../MyLogs/lightColours";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from "@mui/material";


const AddSubjectPopup = ({ open, onClose, addNewSubject }) => {
  const [subjectName, setSubjectName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleAddToList = () => {
    if (subjectName && selectedColor) {
      setSubjects([...subjects, { name: subjectName, color: selectedColor }]);
      setSubjectName("");
      setSelectedColor("");
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

        <FormControl fullWidth margin="normal">
          <InputLabel>Select Color</InputLabel>
          <Select
            value={selectedColor}
            label="Select Color"
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {lightColors.map((color, index) => (
              <MenuItem key={index} value={color}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: color,
                    display: "inline-block",
                    marginRight: 1,
                    border: "1px solid #ccc",
                  }}
                />
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleAddToList}
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 , minWidth: 150 }}
          disabled={!subjectName || !selectedColor}
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
                      backgroundColor: subj.color,
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      marginRight: 2,
                      display: "inline-block",
                    }}
                  />
                  <span style={{ fontWeight: 500, fontSize: "1rem", marginRight: 8 }}>{subj.name}</span>
                  <span style={{ color: "#888", fontSize: "0.9rem" }}>{subj.color}</span>
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
