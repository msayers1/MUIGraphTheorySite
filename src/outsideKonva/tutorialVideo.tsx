import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';

declare var require: {
    context(path: string, deep?: boolean, filter?: RegExp): any;
  };

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