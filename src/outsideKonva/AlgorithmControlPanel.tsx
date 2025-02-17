import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useThemeMode } from "../ThemeContent";
import InputFileUpload from './importExport/importInput';
import { AlgorithmControlState } from '../components/algorithm_controls';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import StopIcon from "@mui/icons-material/Stop";
import DeleteIcon from "@mui/icons-material/Delete";

// Props for the TabPanel component
interface AlgorithmControlPanelProps {
    algorithmControlState: AlgorithmControlState;
    handleControlClick: (buttonId: string)=>void;
    adjustSpeed: (speed: number) => void;
}


const AlgorithmControlPanel: React.FC<AlgorithmControlPanelProps> = ({ algorithmControlState, handleControlClick, adjustSpeed }) => {
    const [speed, setSpeed] = React.useState<number>(50);
    const [anchorOutput, setAnchorOutput] = React.useState<null | HTMLElement>(null);
    const [openOutputMenu, setOpenOutputMenu] = React.useState<boolean>(false);
    const [controlState, setControlState] = React.useState<AlgorithmControlState>(algorithmControlState);
    
    const handleOutputClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorOutput(event.currentTarget);
        setOpenOutputMenu(true);
    };


    const handleSliderChange = (event: Event | React.SyntheticEvent, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            adjustSpeed(newValue);
            setSpeed(newValue);
        }
    }
    
    const handleOutputClose = () => {
        setAnchorOutput(null);
        setOpenOutputMenu(false);
        //console.log("Display output options");
    }

    useEffect(() => {
        if(algorithmControlState != undefined){
            setControlState(algorithmControlState);
            // console.log(`useEffect: ${algorithmControlState.message}`);
        }
    }, [algorithmControlState]); // Runs when `count` changes

    if(algorithmControlState == undefined){
        return(
            <Box>
             <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}><Typography alignContent={'center'}>{''}</Typography></div>
            <Typography>{''}</Typography>
        
            <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                <Button
                    variant="outlined"
                    color="success"
                    disabled
                    onClick={() => handleControlClick("play")}
                    startIcon={<PlayArrowIcon />}
                >
                    Play
                </Button>

                <Button
                    variant="outlined"
                    color="warning"
                    disabled
                    onClick={() => handleControlClick("pause")}
                    startIcon={<PauseIcon />}
                >
                    Pause
                </Button>

                <Button
                    variant="outlined"
                    color="primary"
                    disabled
                    onClick={() => handleControlClick("next")}
                    startIcon={<SkipNextIcon />}
                >
                    Next
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    disabled
                    onClick={() => handleControlClick("stop")}
                    startIcon={<StopIcon />}
                >
                    Stop
                </Button>

                <Button
                    variant="outlined"
                    color="inherit"
                    disabled
                    onClick={() => handleControlClick("clear")}
                    startIcon={<DeleteIcon />}
                >
                    Clear
                </Button>
                <Button disabled onClick={handleOutputClick}>Output</Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorOutput}
                    open={openOutputMenu}
                    onClose={handleOutputClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {handleOutputClose(); handleControlClick("tab")}}>New Tab</MenuItem>
                    <MenuItem onClick={() => {handleOutputClose(); handleControlClick("save")}}>Save as File</MenuItem>

                </Menu>
            </div>
            
            <div style={{display: "flex", justifyContent: "center", gap: "8px" }}><div style={ {width:'90%'}}>
            <Typography id="speed-slider" gutterBottom>
                Speed
            </Typography>
                <Slider
                value={speed}
                min={0}
                step={1}
                max={100}
                disabled
                />
            </div></div>
        </Box>
        )
    }
    
    return (
        <Box>
             <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}><Typography variant="h3" alignContent={'center'}>{algorithmControlState.message}</Typography></div>
            <Typography>{algorithmControlState.algorithm_name}</Typography>
        
            <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                <Button
                    variant="outlined"
                    color="success"
                    disabled={!algorithmControlState.play_btn}
                    onClick={() => handleControlClick("play")}
                    startIcon={<PlayArrowIcon />}
                >
                    Play
                </Button>

                <Button
                    variant="outlined"
                    color="warning"
                    disabled={!algorithmControlState.pause_btn}
                    onClick={() => handleControlClick("pause")}
                    startIcon={<PauseIcon />}
                >
                    Pause
                </Button>

                <Button
                    variant="outlined"
                    color="primary"
                    disabled={!algorithmControlState.next_btn}
                    onClick={() => handleControlClick("next")}
                    startIcon={<SkipNextIcon />}
                >
                    Next
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    disabled={!algorithmControlState.stop_btn}
                    onClick={() => handleControlClick("stop")}
                    startIcon={<StopIcon />}
                >
                    Stop
                </Button>

                <Button
                    variant="outlined"
                    color="inherit"
                    disabled={!algorithmControlState.clear_btn}
                    onClick={() => handleControlClick("clear")}
                    startIcon={<DeleteIcon />}
                >
                    Clear
                </Button>
                <Button disabled={!algorithmControlState.output_drop_btn} onClick={handleOutputClick}>Output</Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorOutput}
                    open={openOutputMenu}
                    onClose={handleOutputClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {handleOutputClose(); handleControlClick("tab")}}>New Tab</MenuItem>
                    <MenuItem onClick={() => {handleOutputClose(); handleControlClick("save")}}>Save as File</MenuItem>

                </Menu>
            </div>
            <div style={{display: "flex", justifyContent: "center", gap: "8px" }}><div style={ {width:'90%'}}>
            <Typography id="speed-slider" gutterBottom>
                Speed
            </Typography>
                <Slider
                value={speed}
                min={0}
                step={1}
                max={100}
                onChange={handleSliderChange}
                />
            </div></div>
        </Box>
    )

}


export default AlgorithmControlPanel;