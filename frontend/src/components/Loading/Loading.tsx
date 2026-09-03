import type { CSSProperties } from "react"

// Loading.css is not a module because the animation targets global class names
import "./Loading.css"

const LOADING_TEXT = "Loading..."

interface BalanceProps {
  className?: string
}

// [Sarah Fossheim](https://fossheim.io/writing/posts/react-text-splitting-animations/)
export const Loading = ({ className }: BalanceProps) => {
  return <p className={`loading ${className}`}>
    {LOADING_TEXT.split("").map((char, index) => {
      const style: CSSProperties = { animationDelay: `${0.5 + index / 10}s` }
      return <span aria-hidden="true" key={index} style={style}>{char}</span>
    })}
  </p>
}