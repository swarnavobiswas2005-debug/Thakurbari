"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Music } from "lucide-react";
import { playlist } from "@/data/playlist";

// Declare YT global namespace for TypeScript
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface MusicPlayerProps {
  onPlayStateChange: (isPlaying: boolean) => void;
  onFirstPlay: () => void;
}

export default function MusicPlayer({ onPlayStateChange, onFirstPlay }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const playerRef = useRef<any>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);

  const currentTrack = playlist[currentTrackIndex];

  // Initialize YouTube Iframe Player
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    }

    function createPlayer() {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player("yt-audio-player", {
        height: "1",
        width: "1",
        videoId: currentTrack.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          origin: typeof window !== "undefined" ? window.location.origin : ""
        },
        events: {
          onReady: (event: any) => {
            setIsPlayerReady(true);
            event.target.setVolume(volume * 100);
          },
          onStateChange: (event: any) => {
            console.log("[YT Player State Change]:", event.data);
            if (event.data === 0) {
              console.log("[YT Player] Song completed. Playing next track automatically...");
              handleTrackEnded();
            }
            if (event.data === 1) {
              setIsPlaying(true);
              onPlayStateChange(true);
              isTransitioningRef.current = false;
            }
            if (event.data === 2) {
              setIsPlaying(false);
              onPlayStateChange(false);
            }
          }
        }
      });
    }

    return () => {};
  }, []);

  // Track Index Synchronization
  useEffect(() => {
    isTransitioningRef.current = false;
    if (isPlayerReady && playerRef.current) {
      if (hasPlayedOnce) {
        playerRef.current.loadVideoById(currentTrack.videoId);
        playerRef.current.playVideo();
        setIsPlaying(true);
        onPlayStateChange(true);
      } else {
        playerRef.current.cueVideoById(currentTrack.videoId);
      }
    }
    setCurrentTime(0);
  }, [currentTrackIndex, isPlayerReady]);

  // Volume Synchronization
  useEffect(() => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current.setVolume(isMuted ? 0 : volume * 100);
    }
  }, [volume, isMuted, isPlayerReady]);

  // Scrubber Progress Pull Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && isPlayerReady && playerRef.current) {
      timer = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
          const videoData = typeof playerRef.current.getVideoData === "function" ? playerRef.current.getVideoData() : null;
          const playerVideoId = videoData ? videoData.video_id : null;

          if (playerVideoId === currentTrack.videoId) {
            const cur = playerRef.current.getCurrentTime() || 0;
            const dur = playerRef.current.getDuration() || 0;
            setCurrentTime(cur);
            setDuration(dur);

            if (dur > 0 && cur >= dur - 1.5) {
              console.log(`[YT Player Fallback] Song close to end (${cur}/${dur}). Auto-advancing...`);
              handleTrackEnded();
            }
          }
        }
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isPlayerReady, currentTrackIndex]);

  // Global Spacebar Keydown Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (
          document.activeElement?.tagName === "INPUT" || 
          document.activeElement?.tagName === "TEXTAREA"
        ) {
          return;
        }
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlayerReady, isPlaying, hasPlayedOnce]);

  // Update browser tab title dynamically
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!hasPlayedOnce) {
      document.title = "ঠাকুরবাড়ি Cookups";
      return;
    }

    const track = playlist[currentTrackIndex];
    if (isPlaying) {
      document.title = `▶ ${track.title} - ${track.artist} | ঠাকুরবাড়ি`;
    } else {
      document.title = `⏸ ${track.title} - ${track.artist} | ঠাকুরবাড়ি`;
    }

    return () => {
      document.title = "ঠাকুরবাড়ি Cookups";
    };
  }, [currentTrackIndex, isPlaying, hasPlayedOnce]);

  const togglePlay = () => {
    if (!isPlayerReady || !playerRef.current) return;

    if (!hasPlayedOnce) {
      setHasPlayedOnce(true);
      onFirstPlay();
    }

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
      onPlayStateChange(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
      onPlayStateChange(true);
    }
  };

  const handleTrackEnded = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    console.log("[YT Player] Track ended triggered.");
    handleNext();
  };

  const handleNext = () => {
    if (!isPlayerReady) return;
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    if (!isPlayerReady) return;
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progress = progressRef.current;
    if (!progress || !playerRef.current || duration === 0 || !isPlayerReady) return;

    const rect = progress.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const seekTime = percentage * duration;
    
    playerRef.current.seekTo(seekTime, true);
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const selectTrack = (index: number) => {
    if (!isPlayerReady) return;
    if (!hasPlayedOnce) {
      setHasPlayedOnce(true);
      onFirstPlay();
    }
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setPlaylistOpen(false);
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .player-container {
              position: fixed;
              bottom: 32px;
              left: 50%;
              transform: translateX(-50%);
              z-index: 100;
              width: 380px;
              background: rgba(15, 10, 7, 0.45); /* frosted glass warm dark */
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.12);
              box-shadow: 
                inset 0 1px 0 rgba(255, 255, 255, 0.05),
                0 15px 35px rgba(0, 0, 0, 0.5);
              border-radius: 4px; /* flat minimalist sharp corners */
              padding: 16px;
              transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .player-header {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              margin-bottom: 12px;
            }

            .track-info {
              flex-grow: 1;
              min-width: 0;
              width: 100%;
            }

            .track-title {
              font-family: var(--font-display), serif;
              font-size: 18px;
              font-weight: 500;
              color: #ffffff;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .track-artist {
              font-size: 11px;
              color: #ffffff;
              opacity: 0.6;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              letter-spacing: 0.03em;
              margin-top: 2px;
            }

            .controls-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 12px;
              margin-top: 8px;
            }

            .main-btns {
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .player-btn {
              width: 32px;
              height: 32px;
              border-radius: 4px; /* sharp corners */
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .player-btn:hover {
              background: rgba(255, 255, 255, 0.15);
              color: #ffffff;
              transform: translateY(-1px);
            }

            .play-pause-btn {
              width: 36px;
              height: 36px;
              background: #ffffff; /* minimalist white */
              border: none;
              color: #0d0705;
              border-radius: 4px;
            }

            .play-pause-btn:hover {
              background: rgba(255, 255, 255, 0.85);
              color: #0d0705;
              transform: scale(1.03);
            }

            .play-pause-btn:disabled {
              background: rgba(255, 255, 255, 0.05);
              color: rgba(255, 255, 255, 0.3);
              cursor: not-allowed;
              transform: none;
            }

            .progress-bar-container {
              width: 100%;
              height: 3px;
              background: rgba(255, 255, 255, 0.15);
              border-radius: 1px;
              cursor: pointer;
              position: relative;
              margin: 12px 0 6px 0;
            }

            .progress-fill {
              height: 100%;
              background: #ffffff; /* minimalist white indicator */
              border-radius: 1px;
              width: 0%;
              transition: width 0.2s linear;
            }

            .progress-time {
              display: flex;
              justify-content: space-between;
              font-size: 10px;
              font-family: monospace;
              color: #ffffff;
              opacity: 0.5;
            }

            .volume-slider-container {
              display: flex;
              align-items: center;
              gap: 6px;
              width: 90px;
            }

            .volume-input {
              width: 100%;
              height: 3px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 1px;
              outline: none;
              -webkit-appearance: none;
              cursor: pointer;
            }

            .volume-input::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #ffffff; /* white volume thumb */
            }

            .playlist-drawer {
              max-height: 0px;
              overflow: hidden;
              transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
              border-top: 0px solid rgba(255, 255, 255, 0);
              margin-top: 0px;
            }

            .playlist-drawer.open {
              max-height: 220px;
              overflow-y: auto;
              border-top: 1px solid rgba(255, 255, 255, 0.12);
              margin-top: 12px;
              padding-top: 12px;
            }

            .playlist-drawer::-webkit-scrollbar {
              width: 4px;
            }
            .playlist-drawer::-webkit-scrollbar-track {
              background: transparent;
            }
            .playlist-drawer::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.15);
              border-radius: 2px;
            }
            .playlist-drawer::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.3);
            }

            .playlist-item {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 10px 14px;
              border-radius: 4px;
              cursor: pointer;
              color: #ffffff;
              opacity: 0.55;
              transition: all 0.2s ease;
              margin-bottom: 6px;
              border-left: 2px solid transparent;
            }

            .playlist-item:hover {
              background: rgba(255, 255, 255, 0.04);
              opacity: 0.85;
            }

            .playlist-item.active {
              color: #ffffff;
              opacity: 1;
              background: rgba(255, 255, 255, 0.06);
              border-left: 2px solid #ffffff;
              border-radius: 0px 4px 4px 0px;
            }

            @media (max-width: 768px) {
              .player-container {
                width: calc(100% - 40px);
                bottom: 24px;
                left: 20px;
                transform: none;
                padding: 12px;
              }
              .track-title {
                font-size: 16px;
              }
            }
          `,
        }}
      />
      <div className="player-container">
        {/* Hidden YouTube Iframe Player Container */}
        <div 
          id="yt-audio-player" 
          style={{ 
            position: "fixed", 
            top: "-100px", 
            left: "-100px", 
            width: "1px", 
            height: "1px", 
            opacity: 0, 
            pointerEvents: "none" 
          }} 
        />

        {/* Player UI */}
        <div className="player-header">
          <div className="track-info">
            <div className="track-title">{currentTrack.title}</div>
            <div className="track-artist">{currentTrack.artist}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div 
          className="progress-bar-container" 
          ref={progressRef}
          onClick={handleProgressClick}
        >
          <div 
            className="progress-fill" 
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
        <div className="progress-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Audio Controls */}
        <div className="controls-row">
          <div className="main-btns">
            <button 
              className="player-btn" 
              onClick={handlePrev}
              disabled={!isPlayerReady}
              aria-label="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button 
              className="player-btn play-pause-btn" 
              onClick={togglePlay}
              disabled={!isPlayerReady}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
            <button 
              className="player-btn" 
              onClick={handleNext}
              disabled={!isPlayerReady}
              aria-label="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Pot */}
          <div className="volume-slider-container">
            <button 
              className="text-[#ffffff] opacity-75 hover:opacity-100 transition-opacity"
              onClick={() => setIsMuted(!isMuted)}
              disabled={!isPlayerReady}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              disabled={!isPlayerReady}
              className="volume-input"
            />
          </div>

          {/* Playlist Button */}
          <button 
            className={`player-btn ${playlistOpen ? "text-[#ffffff] bg-white/10" : ""}`}
            onClick={() => setPlaylistOpen(!playlistOpen)}
            disabled={!isPlayerReady}
            aria-label="Open Playlist"
          >
            <ListMusic className="w-4 h-4" />
          </button>
        </div>

        {/* Slide-out Playlist Drawer */}
        <div className={`playlist-drawer ${playlistOpen ? "open" : ""}`}>
          {playlist.map((track, index) => {
            const isActive = index === currentTrackIndex;
            return (
              <div
                key={index}
                className={`playlist-item ${isActive ? "active" : ""}`}
                onClick={() => selectTrack(index)}
              >
                <span className="text-[10px] font-mono opacity-40 w-4 flex-shrink-0">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="flex-grow min-w-0 text-left">
                  <div className="truncate font-medium text-xs">{track.title}</div>
                  <div className="truncate text-[10px] opacity-60">{track.artist}</div>
                </div>
                {isActive ? (
                  <span className="text-[9px] font-mono tracking-wider text-white bg-white/25 px-1.5 py-0.5 rounded flex-shrink-0 animate-pulse">
                    PLAYING
                  </span>
                ) : (
                  <span className="text-[10px] font-mono opacity-45 flex-shrink-0">Vol. 1</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
