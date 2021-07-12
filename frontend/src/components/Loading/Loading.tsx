import { AnimatedText } from "../AnimatedText/AnimatedText"
import "./Loading.css"

export const Loading: React.FC = () => {
  return <AnimatedText text="Loading..." textClassName="loading" />
}