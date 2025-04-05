// From chat GPT 
import React from 'react';
import { Drawer, List, ListItem, Button } from '@mui/material';

interface SideNavProps {
  menuItems: string[]; // List of strings representing button labels
  onItemSelect: (item: string) => void; // Function to call when an item is clicked
  open: boolean;
}

const APP_BAR_HEIGHT = 64; // Default MUI AppBar height

const SideNav: React.FC<SideNavProps> = ({ menuItems, onItemSelect, open }) => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          top: `${APP_BAR_HEIGHT}px`, // Push below AppBar
          height: `calc(100vh - ${APP_BAR_HEIGHT}px)`, // Fill the rest of the screen
        },
      }}
      // variant="permanent"
      open={open}
      anchor="left"
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index}>
            <Button onClick={() => onItemSelect(item)} fullWidth>
              {item}
            </Button>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNav;
