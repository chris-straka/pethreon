import mp4 from "../../../assets/money.mp4"

/**
 * Decorative background video.
 *
 * There used to be a webm source too, but it was listed after the mp4 and the
 * browser takes the first type it supports -- so with H.264 support universal,
 * the 3.5MB webm was downloaded by nobody while still shipping in the bundle.
 * It was also more than twice the size of the mp4, so it was not even the
 * better encode. Dropped rather than reordered.
 *
 * preload was "true", which is not a valid value ("none" | "metadata" | "auto");
 * browsers fell back to "auto" and fetched the whole file on first paint.
 */
export const Video = () => {
  return (
    <video muted autoPlay loop playsInline preload="metadata" tabIndex={-1} aria-hidden="true">
      <source src={mp4} type="video/mp4" />
      Your browser does not support mp4 video.
    </video>
  )
}
