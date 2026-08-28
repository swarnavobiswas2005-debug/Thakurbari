"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Music, Speaker } from "lucide-react";
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
  const [devicesOpen, setDevicesOpen] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [realDevices, setRealDevices] = useState<{ id: string; label: string }[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("default");
  const [showRerouteToast, setShowRerouteToast] = useState(false);
  const [toastDeviceName, setToastDeviceName] = useState("");

  const updateDevicesList = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
      const devices = await navigator.mediaDevices.enumerateDevices();
      const outputs = devices
        .filter((d) => d.kind === "audiooutput")
        .map((d, idx) => {
          let label = d.label;
          if (!label) {
            if (d.deviceId === "default") {
              label = "Default System Speaker";
            } else {
              label = `Audio Output Target ${idx}`;
            }
          }
          return {
            id: d.deviceId || String(idx),
            label,
          };
        });
      setRealDevices(outputs);
    } catch (err) {
      console.warn("Could not enumerate audio output devices:", err);
    }
  };

  const selectDevice = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    const dev = realDevices.find((d) => d.id === deviceId);
    setToastDeviceName(dev?.label || deviceId);
    setShowRerouteToast(true);
    // Auto hide after 6 seconds
    setTimeout(() => {
      setShowRerouteToast(false);
    }, 6000);
    console.log(`[Audio Output] Destination changed to: ${dev?.label || deviceId}`);
  };

  const requestDevicesPermissionAndList = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Silent request to prompt permissions and unlock device labels
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch (e) {
      console.warn("Media devices permission denied or not supported:", e);
    }
    await updateDevicesList();
  };

  useEffect(() => {
    if (devicesOpen) {
      requestDevicesPermissionAndList();
      navigator.mediaDevices.addEventListener?.("devicechange", updateDevicesList);
    }
    return () => {
      navigator.mediaDevices.removeEventListener?.("devicechange", updateDevicesList);
    };
  }, [devicesOpen]);

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

            .devices-popover {
              position: absolute;
              bottom: 72px;
              right: 16px;
              width: 240px;
              background: rgba(15, 10, 7, 0.95); /* matching frosted glass */
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.15);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6);
              border-radius: 4px;
              padding: 12px;
              z-index: 110;
              text-align: left;
            }

            .devices-header {
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              padding-bottom: 6px;
              margin-bottom: 8px;
            }

            .device-item {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 6px 8px;
              border-radius: 2px;
              font-size: 11.5px;
              color: #ffffff;
              transition: all 0.2s ease;
            }

            .device-item.active {
              background: rgba(255, 255, 255, 0.08);
            }

            .device-dot {
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.3);
            }

            .device-dot.active {
              background: #ffffff;
              box-shadow: 0 0 8px #ffffff;
            }

            .device-info {
              display: flex;
              flex-direction: column;
            }

            .device-type {
              font-size: 9px;
              opacity: 0.5;
              margin-top: 1px;
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

            .reroute-toast {
              position: absolute;
              bottom: 84px;
              left: 50%;
              transform: translateX(-50%);
              width: 340px;
              background: rgba(15, 10, 7, 0.95);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.15);
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
              border-radius: 4px;
              padding: 12px;
              z-index: 120;
              text-align: center;
              animation: toast-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            @keyframes toast-fade-in {
              from { opacity: 0; transform: translate(-50%, 10px); }
              to { opacity: 1; transform: translate(-50%, 0); }
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

          {/* Connected Devices Button */}
          <button 
            className={`player-btn ${devicesOpen ? "text-[#ffffff] bg-white/10" : ""}`}
            onClick={() => { setDevicesOpen(!devicesOpen); setPlaylistOpen(false); }}
            disabled={!isPlayerReady}
            aria-label="Connected Devices"
          >
            <Speaker className="w-4 h-4" />
          </button>

          {/* Playlist Button */}
          <button 
            className={`player-btn ${playlistOpen ? "text-[#ffffff] bg-white/10" : ""}`}
            onClick={() => { setPlaylistOpen(!playlistOpen); setDevicesOpen(false); }}
            disabled={!isPlayerReady}
            aria-label="Open Playlist"
          >
            <ListMusic className="w-4 h-4" />
          </button>
        </div>

        {/* Connected Devices Popover */}
        {devicesOpen && (
          <div className="devices-popover">
            <div className="devices-header">
              <span className="font-bold text-[9px] tracking-widest uppercase opacity-75">
                Connected Devices
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-2 max-h-[160px] overflow-y-auto pr-1">
              {realDevices.length > 0 ? (
                realDevices.map((dev) => {
                  const labelLower = dev.label.toLowerCase();
                  const isBt = labelLower.includes("bluetooth") || labelLower.includes("wireless") || labelLower.includes("buds") || labelLower.includes("pods") || labelLower.includes("headset");
                  const isAux = labelLower.includes("headphone") || labelLower.includes("aux") || labelLower.includes("jack") || labelLower.includes("line out");
                  const type = isBt ? "Bluetooth Link" : isAux ? "AUX Connection" : "System Output";
                  const isActive = dev.id === selectedDeviceId;
                  return (
                    <div 
                      key={dev.id} 
                      className={`device-item cursor-pointer ${isActive ? "active" : ""}`}
                      onClick={() => selectDevice(dev.id)}
                    >
                      <div className={`device-dot ${isActive ? "active" : ""}`} />
                      <div className="device-info min-w-0 flex-grow text-left">
                        <span className="font-semibold text-white truncate block text-[11px]">
                          {dev.label}
                        </span>
                        <span className="device-type">{type}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  <div 
                    className={`device-item cursor-pointer ${selectedDeviceId === "default" ? "active" : ""}`}
                    onClick={() => setSelectedDeviceId("default")}
                  >
                    <div className={`device-dot ${selectedDeviceId === "default" ? "active" : ""}`} />
                    <div className="device-info text-left">
                      <span className="font-semibold text-white text-[11px]">Default Speaker</span>
                      <span className="device-type">System Audio Output</span>
                    </div>
                  </div>
                  <div 
                    className={`device-item cursor-pointer ${selectedDeviceId === "sim-aux" ? "active" : ""}`}
                    onClick={() => setSelectedDeviceId("sim-aux")}
                  >
                    <div className={`device-dot ${selectedDeviceId === "sim-aux" ? "active" : ""}`} />
                    <div className="device-info text-left text-white">
                      <span className="text-[11px] text-white">External Aux Speaker</span>
                      <span className="device-type">AUX Connection</span>
                    </div>
                  </div>
                  <div 
                    className={`device-item cursor-pointer ${selectedDeviceId === "sim-bt" ? "active" : ""}`}
                    onClick={() => setSelectedDeviceId("sim-bt")}
                  >
                    <div className={`device-dot ${selectedDeviceId === "sim-bt" ? "active" : ""}`} />
                    <div className="device-info text-left text-white">
                      <span className="text-[11px] text-white">Bluetooth Headset</span>
                      <span className="device-type">Bluetooth Link</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 text-[9px] opacity-60 text-left leading-normal text-white">
              ℹ️ Note: Due to browser security constraints, cross-origin players (YouTube) cannot be rerouted via webpage code. Please switch outputs in your system or browser sound settings.
            </div>
          </div>
        )}

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
        {showRerouteToast && (
          <div className="reroute-toast">
            <span className="font-semibold text-white text-[11px] block">
              Output Selected: {toastDeviceName.replace("Audio Output Target", "Device Target")}
            </span>
            <span className="text-[9px] opacity-75 mt-1 block leading-normal text-white">
              To route sound, click Chrome's 🎵 Media Control icon in your toolbar, or select it in your system sound panel.
            </span>
          </div>
        )}
      </div>
    </>
  );
}
