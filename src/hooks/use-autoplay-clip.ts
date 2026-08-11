import { useEffect, type RefObject } from "react";

/* Keeps a muted looping clip actually playing on mobile. React drops the
   `muted` attribute from server-rendered HTML, so iOS Safari's parse-time
   autoplay check sees an unmuted video and blocks it, and Low Power Mode
   rejects play() calls outright. Re-assert muted before every attempt,
   retry once the video has data, and fall back to starting on the first
   touch. Honours prefers-reduced-motion by holding on the poster frame. */
export function useAutoplayClip(ref: RefObject<HTMLVideoElement>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const tryPlay = () => {
      if (media.matches) return;
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch(() => {});
    };

    const apply = () => {
      if (media.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        tryPlay();
      }
    };

    apply();
    media.addEventListener("change", apply);
    video.addEventListener("loadeddata", tryPlay);
    window.addEventListener("touchstart", tryPlay, { passive: true });

    return () => {
      media.removeEventListener("change", apply);
      video.removeEventListener("loadeddata", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
  }, [ref]);
}
