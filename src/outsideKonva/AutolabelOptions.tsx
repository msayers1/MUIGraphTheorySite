import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { AutoLabelScheme } from '../drawing/graphdrawing';

// Props for the TabPanel component
interface AuotLabelOptionsProps {
    updateAutoLabelOptions: (option: AutoLabelScheme) => void;
}


const AuotLabelOptions: React.FC<AuotLabelOptionsProps> = ({ updateAutoLabelOptions }) => {
  return (
    
      <RadioGroup
        onChange={(e:React.ChangeEvent<HTMLInputElement>, value:AutoLabelScheme) => {
            updateAutoLabelOptions(value);
        }}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="number"
        name="radio-buttons-group"
      >
        <FormControlLabel value="123" control={<Radio />} label="1,2,3..." />
        <FormControlLabel value="abc" control={<Radio />} label="a,b,c..." />
        <FormControlLabel value="ABC" control={<Radio />} label="A,B,C..." />
      </RadioGroup>
  );
}

export default AuotLabelOptions;