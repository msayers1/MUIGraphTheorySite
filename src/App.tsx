import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import NavBar from './NavBar';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Grid from '@mui/material/Grid2';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <React.Fragment >
      <NavBar />
      <Grid container>
        <Grid >
          <LeftSide />
        </Grid>
        <Grid >

        </Grid>
        <Grid >
          <RightSide />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}