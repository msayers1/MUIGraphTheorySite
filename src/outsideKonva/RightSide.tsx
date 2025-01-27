import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircleOutlined from '@mui/icons-material/CircleOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import AutoLabelOptions from './AutolabelOptions';
import { AutoLabelScheme } from '../drawing/graphdrawing';
import GraphDisplayOptions from './GraphDisplayOptions';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// Props for the TabPanel component
interface RightSideProps {
  updateAutoLabelOptions: (option: AutoLabelScheme) => void;
  updateGraphDisplayOptions: (vertexSize:number, weightFontSize:number) => void;
}

// export default function LeftSide(addGraph) {
const RightSide: React.FC<RightSideProps> = ({ updateAutoLabelOptions, updateGraphDisplayOptions}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
            <Typography component="span">Auto Layout</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button>
                <CircleOutlined/>
              </Button>    
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
            <Typography component="span">Graph Display Options</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GraphDisplayOptions
                updateGraphDisplayOptions={updateGraphDisplayOptions}
              />
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
            <Typography component="span">Vertex Auto-Label Type</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AutoLabelOptions 
                updateAutoLabelOptions={updateAutoLabelOptions}
              />
            </AccordionDetails>
        </Accordion>
    </div>
 );
}

export default RightSide;