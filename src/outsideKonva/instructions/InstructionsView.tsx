import { Typography } from '@mui/material';
import * as React from 'react';
import SideNav from './SideNav';
import GraphicalUserInterfaceComponent from './GUI';
import MiscComponent from './Misc';
import AlgorithmsComponent from './Algorithms';
import About from './About';






interface InstructionsViewProps {
    setInstructionNavStatus: React.Dispatch<React.SetStateAction<boolean>>;
  instructionsNavStatus: boolean;
}


// export default function NavBar() {
const InstructionsView: React.FC<InstructionsViewProps> = ({ setInstructionNavStatus, instructionsNavStatus}) => {


    const [selectedInstruction, setSelectedInstruction] = React.useState('About');   

    function onNavClick (navItem: string) {
        console.log(navItem);
        setSelectedInstruction(navItem);
        setInstructionNavStatus(!instructionsNavStatus);
        // Jump to a section
    }

    // function openNav (){
    //     setSideNavOpen(true);
    // }
  
    // List of strings for the side navigation buttons
    const menuItems = ['About', 'GUI', 'Algrotihms', 'Misc'];

    return(
        <React.Fragment>       
            <SideNav 
                menuItems={menuItems}
                onItemSelect={onNavClick}
                open={instructionsNavStatus}
                />
            {(selectedInstruction == 'About') && <About 
                />}
            {(selectedInstruction == 'GUI') && <GraphicalUserInterfaceComponent 
                />}
            {(selectedInstruction == 'Algrotihms') && <AlgorithmsComponent 
                />}
            {(selectedInstruction == 'Misc') && <MiscComponent 
                />}
        </React.Fragment>
    )
} 
export default InstructionsView;