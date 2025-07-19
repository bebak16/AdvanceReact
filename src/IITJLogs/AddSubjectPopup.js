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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "500px",
          height: "400px",
        },
      }}
    >
      <DialogTitle>Add New Subject</DialogTitle>
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

        {selectedColor && (
          <Box
            sx={{
              mt: 2,
              p: 1,
              borderRadius: 1,
              backgroundColor: selectedColor,
              border: "1px solid #ccc",
              textAlign: "center",
            }}
          >
            Color Preview: {selectedColor}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => addNewSubject(subjectName, selectedColor)}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubjectPopup;
