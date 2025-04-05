import { Typography } from '@mui/material';
import * as React from 'react';
import SideNav from './SideNav';
import GraphicalUserInterfaceComponent from './GUI';


export default function InstructionsView() {

    const [sideNavOpen, setSideNavOpen] = React.useState(false);   

    function onNavClick (navItem: string) {
        console.log(navItem);
        setSideNavOpen(false);
        // Jump to a section
    }

    function openNav (){
        setSideNavOpen(true);
    }
  
    // List of strings for the side navigation buttons
    const menuItems = ['GUI', 'Algrotihms', 'Services', 'Contact'];

    return(
        <React.Fragment>       
            <SideNav 
                menuItems={menuItems}
                onItemSelect={onNavClick}
                open={sideNavOpen}
                />
            <GraphicalUserInterfaceComponent 
                openNav={openNav}
                />
        </React.Fragment>
    )
}