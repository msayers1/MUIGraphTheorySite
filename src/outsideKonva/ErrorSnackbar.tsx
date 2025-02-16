import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export type AlertSeverity  = "error" | "warning" | "info" | "success";

export interface ErrorPackage {
    id: number,
    level: AlertSeverity,
    message: string
}

// interface State extends SnackbarOrigin {
//   open: boolean;
// }

interface ErrorSnackbarProps {
  onClose: () => void;
  open: boolean;
  errorPackage: ErrorPackage;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ onClose, open, errorPackage }) => {


  return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={onClose}
        message={errorPackage.message}
        key={`${errorPackage.id}_${errorPackage.level}`}

      >
        <Alert severity={errorPackage.level}>{errorPackage.message}</Alert>
      </Snackbar>
  );
};


export default ErrorSnackbar;
