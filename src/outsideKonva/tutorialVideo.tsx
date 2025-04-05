import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import videoSrc from '../videos/NewEuclidean.mp4';
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
    seekBack: (time: number) => void;
    isPlaying: () => boolean;
  }

  // Props for the Tutorail Videos component
interface TutorialVideoProps {
    selectedVideo: string;
    onVideoStateChange: (playing: boolean) => void;
}

const VideoComponent = forwardRef<VideoRef ,TutorialVideoProps> (({selectedVideo, onVideoStateChange}, ref) => {
    // const selectedVideo = videos[trainingVideo] || null;
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [playing, setPlaying] = React.useState(false);
    // Expose functions to the parent via ref
    const isVideoPlaying = (): boolean => {
        const video = videoRef.current;
        return !!(
          video &&
          !video.paused &&
          !video.ended &&
          video.readyState > 2
        );
      };

    // Detect play/pause state changes in the video
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => {
            setPlaying(true);
            onVideoStateChange(true); // Notify parent
        };

        const handlePause = () => {
            setPlaying(false);
            onVideoStateChange(false); // Notify parent
        };

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, [onVideoStateChange]);

    useImperativeHandle(ref, () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      seekTo: (fraction: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = videoRef.current.currentTime + videoRef.current.duration * fraction;
        }
      },
      seekBack: (fraction: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = videoRef.current.currentTime - videoRef.current.duration * fraction;
        }
      },
      isPlaying: () => isVideoPlaying()
    }));

    return (
      <video ref={videoRef} key={selectedVideo} width="100%" height="360" controls>
        <source src={`./videos/${selectedVideo}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  );
});

export default VideoComponent;