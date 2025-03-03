import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertSeverity } from './ErrorSnackbar';

export interface MessagePackage {
    id: string,
    level: AlertSeverity,
    message: string
}

// interface State extends SnackbarOrigin {
//   open: boolean;
// }

interface MessageSnackbarProps {
  onClose: () => void;
  open: boolean;
  messagePackage: MessagePackage;
}

const MessageSnackbar: React.FC<MessageSnackbarProps> = ({ onClose, open, messagePackage }) => {


  return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={onClose}
        message={messagePackage.message}
        key={`${messagePackage.id}_${messagePackage.level}`}

      >
        <Alert severity={messagePackage.level}>{messagePackage.message}</Alert>
      </Snackbar>
  );
};


export default MessageSnackbar;
