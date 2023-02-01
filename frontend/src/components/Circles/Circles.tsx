import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAnimationControls } from "framer-motion"
import { CircleA } from "./CircleA/CircleA"
import { CircleB } from "./CircleB/CircleB"
import { CircleC } from "./CircleC/CircleC"

/** 
 * Three circles (two divs and a button)
 */
export const Circles = () => {
  const { pathname: path } = useLocation()
  const a = useAnimationControls()
  const b = useAnimationControls()
  const c = useAnimationControls()
  const spanCreate = useAnimationControls()
  const spanDonate = useAnimationControls()

  useEffect(() => {
    if (path === "/") {
      async function animate() {
        await Promise.all([
          a.start("login"),
          b.start("login"),
          c.start("login"),
          spanCreate.start("login"),
          spanDonate.start("login")
        ])
        await Promise.all([a.start("idle"), b.start("idle"), c.start("idle")])
      }
      animate()
    }

    if (path === "/contribute") {
      async function animate() {
        await Promise.all([
          a.start("contribute"),
          b.start("contribute"),
          c.start("contribute"),
          spanCreate.start("contribute"),
          spanDonate.start("contribute")
        ])
        await Promise.all([a.start("idle"), b.start("idle")])
      }
      animate()
    }

    if (path === "/create") {
      async function animate() {
        await Promise.all([
          a.start("create"),
          b.start("create"),
          c.start("create"),
          spanCreate.start("create"),
          spanDonate.start("create")
        ])
        await Promise.all([a.start("idle"), b.start("idle")])
      }
      animate()
    }

  }, [a, b, c, spanCreate, spanDonate, path])


  return (
    <>
      <CircleA animate={a} />
      <CircleB animate={b} />
      <CircleC buttonAnimate={c} createAnimate={spanCreate} donateAnimate={spanDonate} />
    </>
  )
}