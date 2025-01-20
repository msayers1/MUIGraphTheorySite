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
import Grid from '@mui/material/Grid2';
import { GraphHolder, createNewGraph } from '../graph_core/graph';
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// Props for the TabPanel component
interface LeftSideProps {
  addGraph: (newGraph: GraphHolder) => void;
  nextGraphId: number;
  setGraphId: (newID: number) => void;
}

// export default function LeftSide(addGraph) {
const LeftSide: React.FC<LeftSideProps> = ({ addGraph, nextGraphId, setGraphId }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const newGraph = (graphType:string) => {
    const newGraphObject = createNewGraph(graphType,nextGraphId);
    setGraphId(nextGraphId + 1)
    addGraph(newGraphObject);
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
            <Typography component="span">New Graphs</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1} >
                <Grid size={{md: 12}}>
                  <Button onClick={() => {newGraph("empty-undirected-weighted")}}>
                    Undirected Weighted
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {newGraph("empty-directed-weighted")}}>
                    Directed Weighted
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {newGraph("empty-undirected")}}>
                    Undirected Unweighted
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {newGraph("empty-directed")}}>
                    Directed Unweighted
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {newGraph("empty-euclidean")}}>
                    Euclidean
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {newGraph("empty-directed")}}>
                    Open Graph
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
            <Typography component="span">Tools</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1} >
                <Grid size={{md: 12}}>
                  <Button>
                    <NearMe /> Add/Move
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button>
                    <Clear /> Delete
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button>
                    <Keyboard /> Text
                  </Button>
                </Grid>
              </Grid>
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

export default LeftSide;