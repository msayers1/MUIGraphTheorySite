import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';

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

  // Dynamically import all videos in the folder
// const videoFiles = import.meta.resolve("/path/to/videos/*.mp4");

// Define what functions the parent can call
export interface VideoRef {
    play: () => void;
    pause: () => void;
    seekTo: (time: number) => void;
  }

  // Props for the Tutorail Videos component
interface TutorialVideoProps {
    selectedVideo: string;
}

const VideoComponent = forwardRef<VideoRef ,TutorialVideoProps> (({selectedVideo}, ref) => {
    // const selectedVideo = videos[trainingVideo] || null;
    const videoRef = useRef<HTMLVideoElement | null>(null);
    // Expose functions to the parent via ref
    useImperativeHandle(ref, () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      seekTo: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      }
    }));
    console.log(videoFiles);

    console.log(videos);
    console.log(selectedVideo);
    console.log(videoFiles['NewEuclidean']);
    return (
      <video width="100%" height="360" controls>
        <source src={`${selectedVideo}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  );
});

export default VideoComponent;