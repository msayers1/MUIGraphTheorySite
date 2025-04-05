import React, { useState, useEffect, useRef } from "react";
import TutorialVideo, {VideoRef} from './tutorialVideo';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import StopIcon from "@mui/icons-material/Stop";

interface TrainingModalProps {
  onClose: () => void;
  open: boolean;
}

declare var require: {
    context(path: string, deep?: boolean, filter?: RegExp): any;
  };
// Importing all MP4 videos from the `videos` folder using require.context
const videoFiles = require.context('../../videos', false, /\.mp4$/);

// Create an object mapping filenames to the video paths
const videos = videoFiles.keys().reduce((acc: { [key: string]: string }, filePath: string) => {
    const filename = filePath.replace('./', '').replace('.mp4', '');
    acc[filename] = videoFiles(filePath);
    return acc;
}, {});

const videoNames = videoFiles.keys();
// const formattedVideoNames = videoNames.map(videoName => 
//     videoName
//       .replace(/^.\//, '') // Remove "./" at the beginning
//       .replace(/\.mp4$/, '') // Remove ".mp4" at the end
//       .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters (except the first one)
// );

// Modified array containing both original and modified names
const formattedVideoNames = videoNames.map(videoName => {
    const modifiedName = videoName
      .replace(/^.\//, '') // Remove "./" at the beginning
      .replace(/\.mp4$/, '') // Remove ".mp4" at the end
      .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space before capital letters (except the first one)
  
    return {
      original: videoName,
      modified: modifiedName
    };
  });

const TrainingModal: React.FC<TrainingModalProps> = ({ onClose, open }) => {
    const videoRef = useRef<VideoRef | null>(null);
    const [ selectedVideo, setSelectedVideo] = React.useState('./ChristofidesTSPExample.mp4');
    const [ playing, setPlaying] = React.useState(false);

    const handleChange = (event)=> {
        const video = event.target.value;
        setSelectedVideo(video);
    }
    const handlePlayPause = () => {
        if(playing == false){
            videoRef.current?.play();
            setPlaying(true);
        } else {
            videoRef.current?.pause();
            setPlaying(false);
        }
    }
    if(videoRef != null){
        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle>Training Videos</DialogTitle>
                <DialogContent>
                    <Select name='Selected Video' value={selectedVideo} onChange={handleChange} fullWidth>
                        {formattedVideoNames.map((videoName, index) => (
                            <MenuItem key={index} value={videoName.original}>
                                {videoName.modified}
                            </MenuItem>
                        ))}
                    </Select><br/>
                    <TutorialVideo ref={videoRef} selectedVideo={selectedVideo} onVideoStateChange={setPlaying} />
                </DialogContent>
                <DialogActions>
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                        <Button variant="contained" startIcon={<SkipPreviousIcon />} onClick={() => videoRef.current?.seekBack(.1)}>Seek back</Button>
                        <Button variant="contained" startIcon={playing?<PauseIcon />:<PlayArrowIcon />} onClick={handlePlayPause}>{playing?'Pause':'Play'} </Button>
                        <Button variant="contained" endIcon={<SkipNextIcon />} onClick={() => videoRef.current?.seekTo(.1)}>Seek forward</Button>
                        <Button variant="contained" onClick={() => onClose()}>Close</Button> 
                    </div>
                </DialogActions>
            </Dialog>
        );
    } else {
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Training Videos</DialogTitle>
            <DialogContent>
                <Typography>Loading!</Typography>
                <TutorialVideo ref={videoRef} selectedVideo={selectedVideo} onVideoStateChange={setPlaying} />            
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    }
        
};

export default TrainingModal;
