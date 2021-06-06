/// <reference types="react-scripts" />

// This gets rid of the type error for the video file
declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}