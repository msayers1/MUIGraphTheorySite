import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const vertexWeights = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
// Props for the TabPanel component
interface GraphDisplayOptionsProps {
    updateGraphDisplayOptions: (vertexSize: number, weightFontSize: number) => void;
}



const GraphDisplayOptions: React.FC<GraphDisplayOptionsProps> = ({ updateGraphDisplayOptions }) => {

    const handleChangeSize = (event) => {
        const newValue = event.target.value;
        setVertexSize(newValue);
        updateGraphDisplayOptions(newValue, weightFontSize); // Call the parameter function
    };

    const handleChangeWeight = (event) => {
        const newValue = event.target.value;
        setWeightFontSize(newValue);
        updateGraphDisplayOptions(vertexSize, newValue); // Call the parameter function
    };

    const [vertexSize, setVertexSize] = React.useState<number>(10);
    const [weightFontSize, setWeightFontSize] = React.useState<number>(7);
    return (
        <React.Fragment>
            <InputLabel id="demo-simple-select-label">Vertex Size</InputLabel>
            <Slider value={vertexSize} onChange={handleChangeSize} aria-label="Disabled slider" />
            {/* 
            This option is wired but has no effect with the current wiring. 
            <InputLabel id="demo-simple-select-label">Weight Font Size</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={weightFontSize}
                label="Weight Font Size"
                onChange={handleChangeWeight}
            >
                {vertexWeights.map((number) => (
                    <MenuItem key={number} value={number}>
                      {number}
                    </MenuItem>
                  ))}
            </Select> */}
        </React.Fragment>
  );
}

export default GraphDisplayOptions;


// {vertexWeights.map((number) => (
//     <MenuItem value={number}>{number}</MenuItem>
// ))}