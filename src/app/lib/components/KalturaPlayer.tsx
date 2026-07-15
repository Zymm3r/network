import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Lock, Play, CheckCircle2, SkipForward } from 'lucide-react';

/* ═══════════════════════════════════════════
   KalturaPlayer — Universal Video Player
   Supports: Kaltura PlayKit JS, YouTube, HTML5
   Features: Anti-skip, progress tracking, completion detection
═══════════════════════════════════════════ */

// ─── Kaltura Config ───
const KALTURA_PARTNER_ID = '2910381';
const KALTURA_UICONF_ID = '45972322';
const KALTURA_CDN = `https://cdnapisec.kaltura.com/p/${KALTURA_PARTNER_ID}/embedPlaykitJs/uiconf_id/${KALTURA_UICONF_ID}`;

// ─── Types ───
export interface VideoSource {
  /** The video URL or ID. Supports:
   * - Kaltura entry ID (e.g. "1_abc123xyz")
   * - YouTube URL (watch, embed, or short)
   * - Direct video URL (.mp4, .webm, etc.)
   */
  url: string;
  /** Override auto-detection: 'kaltura' | 'youtube' | 'html5' */
  provider?: 'kaltura' | 'youtube' | 'html5';
}

export interface KalturaPlayerProps {
  /** Video source configuration */
  source: VideoSource;
  /** Prevent seeking past highest-watched point */
  enforceNoSkip?: boolean;
  /** Called when the video is considered "completed" (watched >= threshold) */
  onComplete?: () => void;
  /** Called periodically with watch progress (0-100) */
  onProgress?: (percent: number) => void;
  /** Completion threshold percentage (default: 100) */
  completionThreshold?: number;
  /** Seek to a specific time in seconds */
  seekToSeconds?: number;
  /** Optional CSS class for the container */
  className?: string;
  /** Show the anti-skip lock indicator */
  showLockIndicator?: boolean;
}

// ─── Provider Detection ───
function detectProvider(source: VideoSource): 'kaltura' | 'youtube' | 'html5' {
  if (source.provider) return source.provider;

  const url = source.url;

  // Kaltura entry ID pattern: starts with digits followed by underscore
  if (/^\d+_[a-zA-Z0-9]+$/.test(url)) return 'kaltura';

  // YouTube patterns
  if (
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    (!url.startsWith('http') && /^[a-zA-Z0-9_-]{11}$/.test(url))
  ) {
    return 'youtube';
  }

  return 'html5';
}

// ─── YouTube URL → Embed URL ───
function getYouTubeEmbedUrl(url: string): string | null {
  // Direct YouTube ID (11 chars)
  if (!url.startsWith('http') && /^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return `https://www.youtube.com/embed/${url}`;
  }
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith('/embed/')) return url;
    if (
      (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') &&
      parsed.pathname === '/watch'
    ) {
      const videoId = parsed.searchParams.get('v');
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    if (parsed.hostname === 'youtu.be') {
      const videoId = parsed.pathname.slice(1);
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch { /* invalid URL */ }
  return null;
}

/* ═══════════════════════════════════════════
   Main Component
═══════════════════════════════════════════ */
export function KalturaPlayer({
  source,
  enforceNoSkip = false,
  onComplete,
  onProgress,
  completionThreshold = 100,
  seekToSeconds,
  className = '',
  showLockIndicator = true,
}: KalturaPlayerProps) {
  const provider = detectProvider(source);

  switch (provider) {
    case 'kaltura':
      return (
        <KalturaEmbed
          entryId={source.url}
          enforceNoSkip={enforceNoSkip}
          onComplete={onComplete}
          onProgress={onProgress}
          completionThreshold={completionThreshold}
          seekToSeconds={seekToSeconds}
          className={className}
          showLockIndicator={showLockIndicator}
        />
      );
    case 'youtube':
      return (
        <YouTubeEmbed
          url={source.url}
          enforceNoSkip={enforceNoSkip}
          onComplete={onComplete}
          onProgress={onProgress}
          completionThreshold={completionThreshold}
          seekToSeconds={seekToSeconds}
          className={className}
          showLockIndicator={showLockIndicator}
        />
      );
    default:
      return (
        <Html5Video
          url={source.url}
          enforceNoSkip={enforceNoSkip}
          onComplete={onComplete}
          onProgress={onProgress}
          completionThreshold={completionThreshold}
          seekToSeconds={seekToSeconds}
          className={className}
          showLockIndicator={showLockIndicator}
        />
      );
  }
}

/* ═══════════════════════════════════════════
   Kaltura PlayKit JS Embed
═══════════════════════════════════════════ */
function KalturaEmbed({
  entryId,
  enforceNoSkip,
  onComplete,
  onProgress,
  completionThreshold,
  seekToSeconds,
  className,
  showLockIndicator,
}: {
  entryId: string;
  enforceNoSkip: boolean;
  onComplete?: () => void;
  onProgress?: (percent: number) => void;
  completionThreshold: number;
  seekToSeconds?: number;
  className: string;
  showLockIndicator: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const maxWatchedRef = useRef(0);
  const completedRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [watchPercent, setWatchPercent] = useState(0);

  // Load Kaltura SDK script once
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${KALTURA_CDN}"]`);
    if (existingScript) {
      setIsLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = KALTURA_CDN;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => console.error('[KalturaPlayer] Failed to load Kaltura SDK');
    document.head.appendChild(script);
  }, []);

  // Initialize player when SDK is ready
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const KalturaPlayer = (window as any).KalturaPlayer;
    if (!KalturaPlayer) {
      console.error('[KalturaPlayer] KalturaPlayer global not found after SDK load');
      return;
    }

    try {
      maxWatchedRef.current = 0;
      completedRef.current = false;
      setWatchPercent(0);
      
      const targetId = `kaltura-player-${entryId}`;
      containerRef.current.id = targetId;

      const player = KalturaPlayer.setup({
        targetId,
        provider: {
          partnerId: parseInt(KALTURA_PARTNER_ID),
          uiConfId: parseInt(KALTURA_UICONF_ID),
        },
      });

      player.loadMedia({ entryId });
      playerRef.current = player;

      // ─── Anti-skip enforcement ───
      if (enforceNoSkip) {
        player.addEventListener(player.Event.TIME_UPDATE, () => {
          const currentTime = player.currentTime;
          const duration = player.duration;
          if (duration <= 0) return;

          // Track the highest point the user has naturally reached
          if (currentTime <= maxWatchedRef.current + 2) {
            maxWatchedRef.current = Math.max(maxWatchedRef.current, currentTime);
          }

          // If user tried to skip ahead, snap them back
          if (currentTime > maxWatchedRef.current + 2) {
            player.currentTime = maxWatchedRef.current;
          }

          // Report progress
          const percent = Math.round((maxWatchedRef.current / duration) * 100);
          setWatchPercent(percent);
          onProgress?.(percent);

          // Completion check
          if (percent >= completionThreshold && !completedRef.current) {
            completedRef.current = true;
            onComplete?.();
          }
        });
      } else {
        player.addEventListener(player.Event.TIME_UPDATE, () => {
          const duration = player.duration;
          if (duration <= 0) return;
          const percent = Math.round((player.currentTime / duration) * 100);
          setWatchPercent(percent);
          onProgress?.(percent);
          if (percent >= completionThreshold && !completedRef.current) {
            completedRef.current = true;
            onComplete?.();
          }
        });
      }

      return () => {
        player.destroy();
        playerRef.current = null;
      };
    } catch (err) {
      console.error('[KalturaPlayer] Setup failed:', err);
    }
  }, [isLoaded, entryId, enforceNoSkip, completionThreshold, onComplete, onProgress]);

  // Seek support
  useEffect(() => {
    if (seekToSeconds !== undefined && playerRef.current) {
      const player = playerRef.current;
      if (enforceNoSkip && seekToSeconds > maxWatchedRef.current + 2) {
        return; // Don't allow seeking past max watched
      }
      player.currentTime = seekToSeconds;
      player.play();
    }
  }, [seekToSeconds, enforceNoSkip]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="w-full aspect-video bg-black rounded-xl overflow-hidden" />
      {enforceNoSkip && showLockIndicator && <AntiSkipIndicator percent={watchPercent} />}
    </div>
  );
}

function YouTubeEmbed({
  url,
  enforceNoSkip,
  onComplete,
  onProgress,
  completionThreshold,
  seekToSeconds,
  className,
  showLockIndicator,
}: {
  url: string;
  enforceNoSkip: boolean;
  onComplete?: () => void;
  onProgress?: (percent: number) => void;
  completionThreshold: number;
  seekToSeconds?: number;
  className: string;
  showLockIndicator: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const maxWatchedRef = useRef(0);
  const completedRef = useRef(false);
  const [watchPercent, setWatchPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load YouTube Iframe API
  useEffect(() => {
    if ((window as any).YT && (window as any).YT.Player) {
      setIsLoaded(true);
      return;
    }
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
    (window as any).onYouTubeIframeAPIReady = () => {
      setIsLoaded(true);
    };
  }, []);

  // Extract video ID
  const videoId = useMemo(() => {
    let id = url;
    if (!url.startsWith('http') && /^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
    try {
      const parsed = new URL(url);
      if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1);
      if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.replace('/embed/', '');
      return parsed.searchParams.get('v') || id;
    } catch { return id; }
  }, [url]);

  // Init Player
  useEffect(() => {
    if (!isLoaded || !containerRef.current || !videoId) return;

    maxWatchedRef.current = 0;
    completedRef.current = false;
    setWatchPercent(0);

    const playerId = `yt-player-${Math.random().toString(36).substr(2, 9)}`;
    containerRef.current.id = playerId;

    const player = new (window as any).YT.Player(playerId, {
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        enablejsapi: 1,
      },
      events: {
        onStateChange: (event: any) => {
          // YT.PlayerState.PLAYING == 1
          if (event.data === 1) {
            // Start polling progress
            if (!playerRef.current.progressInterval) {
              playerRef.current.progressInterval = setInterval(() => {
                checkProgress(player);
              }, 1000);
            }
          } else {
            // Stop polling
            clearInterval(playerRef.current.progressInterval);
            playerRef.current.progressInterval = null;
          }
        }
      }
    });
    
    playerRef.current = player;

    return () => {
      if (playerRef.current?.progressInterval) clearInterval(playerRef.current.progressInterval);
      player.destroy();
    };
  }, [isLoaded, videoId]);

  const checkProgress = useCallback((player: any) => {
    if (!player || typeof player.getCurrentTime !== 'function') return;
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    if (!duration) return;

    if (enforceNoSkip) {
      if (currentTime <= maxWatchedRef.current + 2) {
        maxWatchedRef.current = Math.max(maxWatchedRef.current, currentTime);
      } else if (currentTime > maxWatchedRef.current + 2) {
        // Snap back
        player.seekTo(maxWatchedRef.current, true);
      }
    }

    const percent = enforceNoSkip
      ? Math.round((maxWatchedRef.current / duration) * 100)
      : Math.round((currentTime / duration) * 100);

    setWatchPercent(percent);
    onProgress?.(percent);

    if (percent >= completionThreshold && !completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [enforceNoSkip, completionThreshold, onComplete, onProgress]);

  // Seek support
  useEffect(() => {
    if (seekToSeconds !== undefined && playerRef.current && typeof playerRef.current.seekTo === 'function') {
      if (enforceNoSkip && seekToSeconds > maxWatchedRef.current + 2) return;
      playerRef.current.seekTo(seekToSeconds, true);
      playerRef.current.playVideo();
    }
  }, [seekToSeconds, enforceNoSkip]);

  return (
    <div className={`relative ${className}`}>
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
        <div ref={containerRef} className="w-full h-full" />
      </div>
      {enforceNoSkip && showLockIndicator && <AntiSkipIndicator percent={watchPercent} />}
    </div>
  );
}

/* ═══════════════════════════════════════════
   HTML5 Video (with Anti-skip)
═══════════════════════════════════════════ */
function Html5Video({
  url,
  enforceNoSkip,
  onComplete,
  onProgress,
  completionThreshold,
  seekToSeconds,
  className,
  showLockIndicator,
}: {
  url: string;
  enforceNoSkip: boolean;
  onComplete?: () => void;
  onProgress?: (percent: number) => void;
  completionThreshold: number;
  seekToSeconds?: number;
  className: string;
  showLockIndicator: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const maxWatchedRef = useRef(0);
  const completedRef = useRef(false);
  const [watchPercent, setWatchPercent] = useState(0);

  useEffect(() => {
    maxWatchedRef.current = 0;
    completedRef.current = false;
    setWatchPercent(0);
  }, [url]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const currentTime = video.currentTime;
    const duration = video.duration;

    if (enforceNoSkip) {
      if (currentTime <= maxWatchedRef.current + 1) {
        maxWatchedRef.current = Math.max(maxWatchedRef.current, currentTime);
      } else {
        video.currentTime = maxWatchedRef.current;
      }
    }

    const percent = enforceNoSkip
      ? Math.round((maxWatchedRef.current / duration) * 100)
      : Math.round((currentTime / duration) * 100);

    setWatchPercent(percent);
    onProgress?.(percent);

    if (percent >= completionThreshold && !completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [enforceNoSkip, completionThreshold, onComplete, onProgress]);

  // Prevent seeking via the seeking event
  const handleSeeking = useCallback(() => {
    if (!enforceNoSkip) return;
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime > maxWatchedRef.current + 1) {
      video.currentTime = maxWatchedRef.current;
    }
  }, [enforceNoSkip]);

  // Seek support
  useEffect(() => {
    if (seekToSeconds !== undefined && videoRef.current) {
      if (enforceNoSkip && seekToSeconds > maxWatchedRef.current + 1) return;
      videoRef.current.currentTime = seekToSeconds;
      videoRef.current.play().catch(() => {});
    }
  }, [seekToSeconds, enforceNoSkip]);

  return (
    <div className={`relative ${className}`}>
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          src={url}
          className="w-full h-full object-cover"
          controls
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onSeeking={handleSeeking}
        />
      </div>
      {enforceNoSkip && showLockIndicator && <AntiSkipIndicator percent={watchPercent} />}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Anti-Skip Progress Indicator
═══════════════════════════════════════════ */
function AntiSkipIndicator({ percent }: { percent: number }) {
  const isComplete = percent >= 100;

  return (
<<<<<<< HEAD:src/app/components/KalturaPlayer.tsx
    <div className="absolute bottom-12 left-4 z-10 pointer-events-none">
=======
    <div className="absolute bottom-14 left-4 z-10 pointer-events-none">
>>>>>>> origin/main:src/app/lib/components/KalturaPlayer.tsx
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border transition-all duration-500 ${
        isComplete
          ? 'bg-emerald-500/90 text-white border-emerald-400/50'
          : 'bg-slate-900/80 text-slate-200 border-slate-700/50'
      }`}>
        {isComplete ? (
          <>
            <CheckCircle2 size={14} className="text-emerald-100" />
            <span>ดูจบแล้ว</span>
          </>
        ) : (
          <>
            <Lock size={12} className="text-amber-400" />
            <span>ห้ามข้าม</span>
            <span className="ml-1 text-indigo-300">{percent}%</span>
          </>
        )}
      </div>
    </div>
  );
}

export default KalturaPlayer;
