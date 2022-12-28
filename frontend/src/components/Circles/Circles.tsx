import { CircleA } from "./CircleA/CircleA";
import { CircleB } from "./CircleB/CircleB";
import { CircleC } from "./CircleC/CircleC";

interface CirclesProps {
  circleAnimationDuration: number,
  pageFadeOutDuration: number,
  pageFadeInDuration: number,
}

export const Circles = ({ circleAnimationDuration, pageFadeOutDuration, pageFadeInDuration }: CirclesProps) => {
  return (
    <>
      <CircleA duration={circleAnimationDuration} delay={pageFadeOutDuration} />
      <CircleB duration={circleAnimationDuration} delay={pageFadeOutDuration} />
      <CircleC
        circleAnimationDuration={circleAnimationDuration}
        circleAnimationDelay={pageFadeOutDuration}
        pageFadeOutDuration={pageFadeOutDuration}
        pageFadeInDuration={pageFadeInDuration}
      />
    </>
  )
}
