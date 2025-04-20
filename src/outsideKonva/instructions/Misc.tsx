import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const MiscComponent = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom>
        Miscellaneous
      </Typography>
      <Typography variant="h4" gutterBottom>
        Example Problems:             
      </Typography>
      <Typography variant="h6" gutterBottom>
        Example 3.23 form Dosey et al, Discrete Math(4th ed):             
      </Typography>
      <Typography variant="body1" gutterBottom>
        The State Senate has a number of major standing committees with every senator on one or more of these. Each committee meets every week for an hour. Each senator must be able to attend each meeting of a committe he or she is on, and so no two committees can meet at the same time if they have a member in common. The clerk of the Senater is responsible for scheduling these meetings. How should the Clerk schedule these committee meetings so that the senators can attend their major committee meetings and keep the number of meeting times as small as possible?             
      </Typography>
                
    </Box>
  );
};

export default MiscComponent;