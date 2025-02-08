import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import NearMe from '@mui/icons-material/NearMe';
import Clear from '@mui/icons-material/Clear';
import Keyboard from '@mui/icons-material/Keyboard';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import * as TabBar from '../components/tabbar';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AutoLabelOptions from './AutolabelOptions';
import { LayoutName } from '../drawing/layouts';
import { AutoLabelScheme } from '../drawing/graphdrawing';
import GraphDisplayOptions from './GraphDisplayOptions';
import { CheckBoxOutlineBlankOutlined, MoreVert, ZoomOutMap } from '@mui/icons-material';
import CircleOutlined from '@mui/icons-material/CircleOutlined';
import { StoredDrawingInfo } from '../store/graphstore';
import HighlightOff from '@mui/icons-material/HighlightOff';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// Props for the TabPanel component
interface LeftSideProps {
  addGraph: (tabType: TabBar.TabType) => void;
  updateTool: (tool: string) => void;
  updateAutoLayoutOption: (option: LayoutName) => void;
  updateAutoLabelOptions: (option: AutoLabelScheme) => void;
  updateGraphDisplayOptions: (vertexSize:number, weightFontSize:number) => void;
  openBookmark: (item:StoredDrawingInfo) => void;
  bookmarks: StoredDrawingInfo[];
  handleRemoveBookmark: (id:number) => void;
}

// export default function LeftSide(addGraph) {
const LeftSide: React.FC<LeftSideProps> = ({ addGraph, updateTool, updateAutoLayoutOption, updateAutoLabelOptions, updateGraphDisplayOptions, bookmarks, openBookmark, handleRemoveBookmark }) => {
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
            <Typography component="span">New Graphs</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1} >
                <Grid size={{md: 12}}>
                  <Button onClick={() => {addGraph("empty-undirected-weighted")}}>
                    Undirected Weighted
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {addGraph("empty-directed-weighted")}}>
                    Directed Weighted
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {addGraph("empty-undirected")}}>
                    Undirected Unweighted
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {addGraph("empty-directed")}}>
                    Directed Unweighted
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {addGraph("empty-euclidean")}}>
                    Euclidean
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {addGraph("empty-directed")}}>
                    Open Graph
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
            <Typography component="span">Tools</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1} >
                <Grid size={{md: 12}}>
                  <Button onClick={() => {updateTool("default")}}>
                    <NearMe /> Add/Move
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {updateTool("delete")}}>
                    <Clear /> Delete
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {updateTool("text")}}>
                    <Keyboard /> Text
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {updateTool("color")}}>
                    <ColorLensIcon /> Color
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
            <Typography component="span">Auto Layout</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container spacing={1} >
              <Grid size={{md: 12}}>
                <Button onClick={()=>{updateAutoLayoutOption("circular" as LayoutName)}}>
                  <CircleOutlined/> &nbsp; &nbsp; Circular
                </Button>
              </Grid>
              <Grid>   
                <Button onClick={()=>{updateAutoLayoutOption("bipartite" as LayoutName)}}>
                  <MoreVert /><MoreVert /> &nbsp; Bipartite
                </Button>
              </Grid>
              <Grid size={{md: 12}}>
                <Button onClick={()=>{updateAutoLayoutOption("grid" as LayoutName)}}>
                  <CheckBoxOutlineBlankOutlined/> &nbsp; &nbsp; Grid
                </Button>
              </Grid>
              <Grid>   
                <Button onClick={()=>{updateAutoLayoutOption("forcebased" as LayoutName)}}>
                  <ZoomOutMap /> &nbsp; Force
                </Button>
              </Grid>
            </Grid>
              
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
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
            <Typography component="span">Bookmarked Graphs</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container spacing={1} >
              {(typeof(bookmarks) != "undefined")?
              <React.Fragment>
                {bookmarks.map((item) => {
                  return(<Grid key={item.id} size={{md: 12}}>
                    <Button  
                      onClick={()=>{openBookmark(item)}}
                      endIcon={<div
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent triggering the tab change
                          handleRemoveBookmark(item.id);
                        }}
                        >
                            <HighlightOff fontSize="small" />
                          </div>}
                      >
                      {item.id} - {item.name}
                    </Button>
                  </Grid>)
                })}
              </React.Fragment>:
              <Typography>No Bookmarks</Typography>
            }
            </Grid>
            </AccordionDetails>
        </Accordion>
    </div>
 );
}

export default LeftSide;