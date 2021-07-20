interface AnimatedTextProps {
  animatedTextCssClass: string,
  text: string
}

// [Sarah Fossheim](https://fossheim.io/writing/posts/react-text-splitting-animations/)

export const AnimatedText = ({ animatedTextCssClass, text }: AnimatedTextProps) => {
  return <p className={animatedTextCssClass} aria-label={text}>
    {text.split("").map((char, index) => {
      let style: any = { "animation-delay": + (0.5 + index / 10) + "s" }
      return <span
        aria-hidden="true"
        key={index}
        style={style}>{char}</span>
    })}
  </p>
}