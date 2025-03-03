import React from "react";
import Box from "@mui/material/Box";

export interface ColorInformation {
    colorId: number;
    colorString: string;
}


interface ColorSwatchProps {
  color: string;
  size?: number;
  active: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, size = 40, active }) =>{
  const bordorSize = active?5:1;
  const transparency = active?1:.2;
  return(
      <Box
        // sx={{
        //     width: 100,
        //     height: 100,
        //     borderRadius: 1,
        //     color: color,
        // }}
        sx={{
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: 2, // Optional: Rounded corners
          border: `${bordorSize}px solid rgba(0, 0, 0, ${transparency})`, // Optional: Border for visibility
        }}
      />
    );
  };
  
  export default ColorSwatch;
