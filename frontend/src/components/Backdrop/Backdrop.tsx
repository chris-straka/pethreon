import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom";
import styles from "./Backdrop.module.scss"

interface BackdropProps {
  backdropAnimationDuration: number,
  backdropAnimationDelay: number,
}

export function Backdrop({
  backdropAnimationDuration,
  backdropAnimationDelay,
}: BackdropProps
) {
  const divRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation()

  useEffect(() => {
    const refStyle = divRef.current?.style
    if (!refStyle) return

    refStyle.transitionDuration = `${backdropAnimationDuration}s`
    refStyle.transitionDelay = `${backdropAnimationDelay}s`

    if (pathname === "/") {
      refStyle.opacity = "1"
      refStyle.display = "block"
    }

    if (pathname === "/contribute") {
      refStyle.opacity = "0"
      setTimeout(() => {
        refStyle.display = "none"
      }, 1000 * (backdropAnimationDelay + backdropAnimationDuration))
    }

    if (pathname === "/create") {
      refStyle.opacity = "0"
      setTimeout(() => {
        refStyle.display = "none"
      }, 1000 * (backdropAnimationDelay + backdropAnimationDuration))
    }

  }, [backdropAnimationDelay, backdropAnimationDuration, pathname])

  return <div id={styles.backdrop} ref={divRef} />
}