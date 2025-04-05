import React from 'react';
import { Typography, Box, Button } from '@mui/material';


// Props for the TabPanel component
interface GUIProps {
    openNav: ()=> void;
}


// export default function NavBar() {


const GraphicalUserInterfaceComponent: React.FC<GUIProps> = ({openNav}) => {
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
    </Box>
  );
};

export default GraphicalUserInterfaceComponent;