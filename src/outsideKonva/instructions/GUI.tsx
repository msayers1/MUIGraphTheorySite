import React from 'react';
import { Typography, Box, Button } from '@mui/material';




// export default function NavBar() {


const GraphicalUserInterfaceComponent: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom>
        Graphical User Interface
      </Typography>
      <Typography variant="h6" gutterBottom>Top Bar:</Typography>
      <Typography variant="body1" color="text.secondary"> 
        Graph View:
        The top bar contains the name of the system (Graph Theory Site) on the left side and several buttons on the right. The right most two are drop-down menus. The drop down menus can be clicked to reveal a list of options. The Graph drop-down  menu contains options relating to the actions that may be applied on a graph,  like saving the graph, bookmarking the graph, opening a new graph, or generating a graph. The  Algorithm drop-down menu contains a list of algorithms that can be applied  to graphs. The next button is Tutorial Videos which brings up a modal of tutorial videos. These videos show common tasks completed. The next is an alternating button between instructions and graph currently. Instructions plans to be a list of instructions and other useful information. Maybe swapping to Wiki instead. 
        Instruction View: 
        The top bar contains the name of the system (Graph Theory Site) on the left side and two buttons on the right. The right hand side will have the Graph button which will take you back to the graph view. And Tutorial Videos which brings up a modal of tutorial videos.    
      </Typography>
      <Typography variant="h6" gutterBottom>Left Navigation:</Typography>
      <Typography variant="body1" color="text.secondary">
        The top bar contains the name of the system (Graph Theory Site) on the left side and several buttons on the right. The right most two are drop-down menus. The drop down menus can be clicked to reveal a list of options. The Graph drop-down  menu contains options relating to the actions that may be applied on a graph,  like saving the graph, bookmarking the graph, opening a new graph, or generating a graph. The  Algorithm drop-down menu contains a list of algorithms that can be applied  to graphs.
      </Typography>
      <Typography variant="h6" gutterBottom>Center Graph Area:</Typography>
      <Typography variant="body1" color="text.secondary">
        The center area is where graphs are created. You may depending on the tool which is selected: add/move vertices or edges(Add/Move), delete the vertices or edges(Delete), modify the labels of vertices (text), change the color of vertices or edges (Color). Once graphs are created, tabs appear above the graph area to allow multiple graphs at once. Also clicking in the white space between vertices and edges allows you to shift the entire graph. Edges are also able to be curved one direction or the other in all tools. Weights can be adjusted in either Add/Move or Text tools. 
      </Typography>
      <Typography variant="h6" gutterBottom>Algorithm Controls:</Typography>
      <Typography variant="body1" color="text.secondary">
        The bottom area is where algorithms are controlled. These are enabled when you select an algorithm. You are able to play, pause, stop the algorithm, or when paused go to the next step of an algorithm. The ability to clear any annotations of the graph and reset it, is achieved by the clear button. You also have the option to save the output graph or create a tab of the algorithm output. 
      </Typography>
    </Box>
  );
};

export default GraphicalUserInterfaceComponent;