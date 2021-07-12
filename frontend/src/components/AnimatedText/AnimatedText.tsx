export const AnimatedText: React.FC<{ textClassName: string, text: string }> = ({ textClassName, text }) => {
  return <p className={textClassName} aria-label={text}>
    {text.split("").map((char, index) => {
      let style: any = { "animation-delay": + (0.5 + index / 10) + "s" }
      return <span
        aria-hidden="true"
        key={index}
        style={style}>{char}</span>
    })}
  </p>
}