import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import  About  from "./instructions/About";


interface AboutModalProps {
  onClose: () => void;
  open: boolean;
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose, open }) => {
   
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>About Graph Playground</DialogTitle>
      <DialogContent>
        <About />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AboutModal;
