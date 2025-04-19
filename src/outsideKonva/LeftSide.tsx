import * as React from 'react';
import { Color, styled, useTheme } from '@mui/material/styles';
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
import InputFileUpload from './importExport/importInput';
import ColorSwatch, { ColorInformation } from '../decoration/color';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// Props for the Left Side component
interface LeftSideProps {
  addGraph: (tabType: TabBar.TabType) => void;
  updateTool: (tool: string) => void;
  updateAutoLayoutOption: (option: LayoutName) => void;
  updateAutoLabelOptions: (option: AutoLabelScheme) => void;
  updateGraphDisplayOptions: (vertexSize:number, weightFontSize:number) => void;
  openBookmark: (item:StoredDrawingInfo) => void;
  bookmarks: StoredDrawingInfo[];
  handleRemoveBookmark: (id:number) => void;
  importGraph: (filelist: FileList) => void;
  colorInformation: ColorInformation[];
  updateColor: (ColorInformation: ColorInformation) => void;
  activeColor: ColorInformation;
  activeTool: string;
  autoLabelOption: AutoLabelScheme;
}

// export default function LeftSide(addGraph) {
const LeftSide: React.FC<LeftSideProps> = ({ addGraph, updateTool, updateAutoLayoutOption, updateAutoLabelOptions, updateGraphDisplayOptions, bookmarks, openBookmark, handleRemoveBookmark, importGraph, colorInformation, updateColor, activeColor, activeTool, autoLabelOption }) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1"); // Default to open "panel1"
  const [localActiveColor, setLocalActiveColor] = React.useState(activeColor);
  const setActiveColor = (color) => {
    updateColor(color);
    setLocalActiveColor(color);
  }

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
        <Accordion  expanded={expanded === "panel1"}  onChange={handleChange("panel1")}>
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
                  <Button component="label" tabIndex={-1}>
                    Open Graph
                    <InputFileUpload openGraph={(filelist) => {importGraph(filelist);}} />
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
                  <Button onClick={() => {updateTool("default")}} variant={activeTool == "default"?"contained":"text"}>
                    <NearMe /> Add/Move
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {updateTool("delete")}} variant={activeTool == "delete"?"contained":"text"}>
                    <Clear /> Delete
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {updateTool("text")}} variant={activeTool == "text"?"contained":"text"}>
                    <Keyboard /> Text
                  </Button>
                </Grid>
                <Grid size={{md: 12}}>
                  <Button onClick={() => {updateTool("color")}}  variant={activeTool == "color"?"contained":"text"}>
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
                autoLabelOption={autoLabelOption}
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
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
            <Typography component="span">Color Management</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container spacing={1} >
              {(colorInformation.length != 0)?
              <React.Fragment>
                {colorInformation.map((color, index, ColorInformation) => {
                  return(<Grid key={color.colorId} size={{md: 4}}>
                      <Button
                        onClick={()=>setActiveColor(color)}
                      >
                      <ColorSwatch 
                        color={color.colorString}
                        size={50}
                        active={(localActiveColor.colorId == color.colorId)}
                      />
                      </Button>
                  </Grid>)})}
              </React.Fragment>
              :<div/>
              }
            </Grid>
            </AccordionDetails>
        </Accordion>
    </div>
 );
}

export default LeftSide;