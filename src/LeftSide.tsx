import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import NearMe from '@mui/icons-material/NearMe';
import Clear from '@mui/icons-material/Clear';
import Keyboard from '@mui/icons-material/Keyboard';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function LeftSide() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
            <Typography component="span">Tools</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <NearMe /> Add/Move
                <Clear /> Delete
                <Keyboard /> Text
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
            <Typography component="span">Bookmarked Graphs</Typography>
            </AccordionSummary>
            <AccordionDetails>
            No Bookmarked Graphs
            </AccordionDetails>
        </Accordion>
    </div>
 );
}