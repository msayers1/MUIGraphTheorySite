import React from 'react';
import { Typography, Box, Button, Link } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom>
        Graph Playground
      </Typography>
      <Typography variant="body2" gutterBottom>
        This is a project which started under Neeraj Adhikari with his thesis: GRAPH PLAYGROUND: A PEDAGOGIC TOOL FOR GRAPH THEORY AND ALGORITHMS <Link target="_blank" rel="noopener noreferrer" href={"https://digitalcommons.uri.edu/theses/1982/"} >(1)</Link> It has been added to by Michael Sayers this semester and shifted to React Application. The various states of the code can be found either in Neeraj Adhikari's code <Link target="_blank" rel="noopener noreferrer" href={"https://github.com/nradk/gtpg"} >Neeraj's Github Graph Theory Playground</Link> or an updated code base <Link target="_blank" rel="noopener noreferrer" href={"https://github.com/msayers1/MUIGraphTheorySite"} >Michael's Github Graph Theory Site</Link>.  Nerraj also left an active version of his code <Link target="_blank" rel="noopener noreferrer" href={"https://neerajadh.gitlab.io/graph-playground/#"} >Graph Playground</Link>        
      </Typography>                
    </Box>
  );
};

export default About;