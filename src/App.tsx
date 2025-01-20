import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavBar from './ui_handlers/NavBar';
import LeftSide from './ui_handlers/LeftSide';
import RightSide from './ui_handlers/RightSide';
import Grid from '@mui/material/Grid2';
import { GraphHolder } from './graph_core/graph';
import GraphTabs from './ui_handlers/GraphTabs';




export default function App() {
  
  const [nextGraphId, setGraphId] = React.useState(1);
  const [graphs, setGraphs] = React.useState<GraphHolder[]>([]);
  const addGraph = (newGraph: GraphHolder) => {
    setGraphs([...graphs, newGraph]); // Create a new array with existing graphs and the new graph
  };




  return (
    <React.Fragment>
      <NavBar />
      <Grid container spacing={1} >
        <Grid size={{md: 2}}>
          <LeftSide
            addGraph={addGraph}
            nextGraphId={nextGraphId}
            setGraphId={setGraphId}
             />
        </Grid>
        <Grid size={{md: 8}}>
          {graphs.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                No graphs open. Please click New Graphs to the left to see options to create a graph.
              </Typography>
            ) : (
              <GraphTabs 
                graphs={graphs}
              />
            )}
        </Grid>
        <Grid size={{md: 2}}>
          <RightSide />
        </Grid>
      </Grid>

    </React.Fragment>
  );
}