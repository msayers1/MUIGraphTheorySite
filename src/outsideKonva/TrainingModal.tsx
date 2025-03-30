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
const formattedVideoNames = videoNames.map(videoName => 
    videoName
      .replace(/^.\//, '') // Remove "./" at the beginning
      .replace(/\.mp4$/, '') // Remove ".mp4" at the end
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters (except the first one)
);

const TrainingModal: React.FC<TrainingModalProps> = ({ onClose, open }) => {
    const videoRef = useRef<VideoRef | null>(null);
    const [ videoFiles, setVideoFiles] = React.useState(undefined);
    const [ selectedVideo, setSelectedVideo] = React.useState('New Euclidean');
    console.log(videoFiles);

    const handleChange = (event)=> {
        console.log(event);
        const video = event.target.value;
        setSelectedVideo(video);
    }
    console.log(`Information: ${videoRef} - ${(videoRef != null)} ${selectedVideo}`)
    if(videoRef != null){
        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle>Training Videos</DialogTitle>
                <DialogContent>
                    <Select value={selectedVideo} onChange={handleChange} fullWidth>
                        {formattedVideoNames.map((videoName, index) => (
                            <MenuItem key={index} value={videoName}>
                                {videoName}
                            </MenuItem>
                        ))}
                    </Select><br/>
                    <TutorialVideo ref={videoRef} selectedVideo={selectedVideo} />
                </DialogContent>
                <DialogActions>
                    <button onClick={() => videoRef.current?.play()}>Play</button>
                    <button onClick={() => videoRef.current?.pause()}>Pause</button>
                    <button onClick={() => videoRef.current?.seekTo(10)}>Seek to 10s</button>
                    <button onClick={() => onClose()}>Close</button> 
                </DialogActions>
            </Dialog>
        );
    } else {
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Training Videos</DialogTitle>
            <DialogContent>
                <Typography>Loading!</Typography>
                <TutorialVideo ref={videoRef} selectedVideo={selectedVideo} />            
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    }
        
};

export default TrainingModal;
