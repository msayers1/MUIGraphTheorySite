import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";

interface SaveGraphModalProps {
  onClose: () => void;
  saveModalDefaultName: string;
  open: boolean;
  onSave: (fileName: string) => void;
}

const SaveGraphModal: React.FC<SaveGraphModalProps> = ({ onClose, saveModalDefaultName, open,onSave }) => {
  const [fileName, setFileName] = useState<string>(saveModalDefaultName);

  // Handle save action
  const handleSave = () => {
    if (fileName) {
      onSave(fileName);
      onClose();
    }
  };

  useEffect(() => {
    setFileName(saveModalDefaultName);
  }, [saveModalDefaultName]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Enter Filename</DialogTitle>
      <DialogContent>
        {/* Filename Input */}
        <TextField
          label="Enter Filename"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={!fileName}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveGraphModal;
