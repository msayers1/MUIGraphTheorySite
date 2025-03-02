// import React from "react";
// import Box from "@mui/material/Box";

// export interface ColorInformation {
//     colorId: number;
//     colorString: string;
// }


// interface ColorSwatchProps {
//   color: string;
//   size?: number;
// }

// const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, size = 40 }) => (
//       <Box
//         sx={{
//             width: 100,
//             height: 100,
//             borderRadius: 1,
//             bgcolor= '#444444',
//             '&:hover': {
//                bgcolor: #444444,
//             },
//         }}
//         // sx={{
//         //   width: size,
//         //   height: size,
//         //   backgroundColor: color,
//         //   borderRadius: 2, // Optional: Rounded corners
//         //   border: "1px solid rgba(0, 0, 0, 0.2)", // Optional: Border for visibility
//         // }}
//       />
//     );
  
//   export default ColorSwatch;

import React from "react";
import Box from "@mui/material/Box"; // Ensure proper import

interface ColorSwatchProps {
  color: string;
  size?: number;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, size = 40 }) => {
  return (
    <React.Fragment>
        <Box
            sx={{
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: 2, // Optional: Rounded corners
                border: "1px solid rgba(0, 0, 0, 0.2)", // Optional: Border for visibility
            }}
        />
    </React.Fragment>
  );
};

export default ColorSwatch;
