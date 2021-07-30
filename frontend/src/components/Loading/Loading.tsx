import "./Loading.css"

const LOADING_TEXT = "Loading..."

// [Sarah Fossheim](https://fossheim.io/writing/posts/react-text-splitting-animations/)
export const Loading = () => {
  return <p className="loading">
    {LOADING_TEXT.split("").map((char, index) => {
      let style: any = { "animationDelay": + (0.5 + index / 10) + "s" }
      return <span
        aria-hidden="true"
        key={index}
        style={style}>{char}</span>
    })}
  </p>
}