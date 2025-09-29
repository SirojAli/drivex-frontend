import React, { useEffect, useRef } from 'react';
import { Stack } from '@mui/material';

function extractVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    let videoId: string | null = null;

    if (hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
      videoId = urlObj.searchParams.get('v');
    } else if (hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    } else if (hostname.includes('youtube.com') && urlObj.pathname.startsWith('/shorts/')) {
      videoId = urlObj.pathname.split('/')[2];
    }

    return videoId;
  } catch {
    return null;
  }
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

type CarVideoPlayerProps = {
  videoUrl?: string;
};

const CarVideoPlayer: React.FC<CarVideoPlayerProps> = ({ videoUrl }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);

  useEffect(() => {
    const videoId = videoUrl ? extractVideoId(videoUrl) : null;
    if (!videoId || !playerRef.current) return;

    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => {
          createPlayer();
        };
      }
    };

    const createPlayer = () => {
      playerInstanceRef.current = new window.YT.Player(playerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 1,
          loop: 1,
          playlist: videoId,
        },
        events: {
          onReady: async (event: any) => {
            const duration = event.target.getDuration();
            let speed = 0.75;

            if (duration <= 20) {
              speed = 0.65;
            } else if (duration <= 30) {
              speed = 0.75;
            } else {
              speed = 1.0;
            }

            event.target.setPlaybackRate(speed);
            event.target.playVideo();
          },
        },
      });
    };

    loadYouTubeAPI();

    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
      }
    };
  }, [videoUrl]);

  return (
    <Stack id="video" className="video-frame" sx={{ width: '100%', height: '400px' }}>
      {videoUrl ? (
        <div ref={playerRef} style={{ width: '100%', height: '100%' }} />
      ) : (
        <p>No video available.</p>
      )}
    </Stack>
  );
};

export default CarVideoPlayer;
