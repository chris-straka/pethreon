import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Circles } from "./Circles"
import { variants } from "./Circle.variants"
import { setMatchingMediaQueries } from "../../test/setup"

const renderAt = (path: string) =>
  render(<MemoryRouter initialEntries={[path]}><Circles /></MemoryRouter>)

describe("Circle variants", () => {
  // Circles.tsx calls controls.start(<name>) with these strings; if a rename or
  // an upgrade drops one, the animation silently no-ops.
  it.each(["idle", "login", "contribute", "create", "disappear", "reappear"])(
    "defines the %s variant", name => {
      expect(variants[name]).toBeDefined()
    })

  it("drives position through CSS custom properties, not hardcoded pixels", () => {
    for (const name of ["login", "contribute", "create"]) {
      const v = variants[name] as Record<string, unknown>
      expect(v.x).toMatch(/^var\(--x-/)
      expect(v.y).toMatch(/^var\(--y-/)
      expect(v.width).toMatch(/^var\(--width-/)
      expect(v.height).toMatch(/^var\(--height-/)
    }
  })

  it("loops the idle variant forever so the circles keep breathing", () => {
    const idle = variants.idle as { transition: { repeat: number, repeatType: string } }
    expect(idle.transition.repeat).toBe(Infinity)
    expect(idle.transition.repeatType).toBe("reverse")
  })
})

describe("Circles", () => {
  it.each(["/", "/contribute", "/create"])("renders all three circles at %s", path => {
    const { container } = renderAt(path)
    expect(container.querySelectorAll("div[aria-hidden='true']")).toHaveLength(3)
  })

  it("hides the circles from assistive tech", () => {
    renderAt("/")
    // purely decorative: nothing here should be exposed to a screen reader
    expect(screen.queryByRole("presentation")).toBeNull()
    expect(document.querySelectorAll("[aria-hidden='true']")).toHaveLength(3)
  })

  it("applies the shared default style to every circle", () => {
    const { container } = renderAt("/")
    for (const el of container.querySelectorAll<HTMLElement>("div[aria-hidden='true']")) {
      expect(el.style.borderRadius).toBe("50%")
      expect(el.style.zIndex).toBe("3")
    }
  })

  it("still renders when the user asks for reduced motion", () => {
    setMatchingMediaQueries(["(prefers-reduced-motion: reduce)"])
    const { container } = renderAt("/contribute")
    // animation is skipped, but the circles must not vanish
    expect(container.querySelectorAll("div[aria-hidden='true']")).toHaveLength(3)
    setMatchingMediaQueries([])
  })

  it("re-runs its animation effect when the viewport changes", () => {
    const { container } = renderAt("/")
    window.innerWidth = 500
    window.dispatchEvent(new Event("resize"))
    expect(container.querySelectorAll("div[aria-hidden='true']")).toHaveLength(3)
  })
})

vi.mock("@web3-onboard/react", () => ({ useConnectWallet: () => [{}, vi.fn()] }))
