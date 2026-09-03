import { describe, expect, it, vi } from "vitest"
import { render, screen, act, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderHook } from "@testing-library/react"
import { ModalBackdrop } from "./ModalBackdrop/ModalBackdrop"
import { Loading } from "./Loading/Loading"
import { Backdrop } from "./Backdrop/Backdrop"
import { UserBalance } from "./UserBalance/UserBalance"
import { usePreferredMotion, usePreferredTheme } from "../hooks"
import { Typewriter } from "../pages/Login/components/Typewriter"
import { setMatchingMediaQueries } from "../test/setup"
import type { Location } from "react-router-dom"

const location = (pathname: string) =>
  ({ pathname, search: "", hash: "", state: null, key: "test" }) as Location

describe("ModalBackdrop", () => {
  it("exposes the modal to assistive tech", () => {
    render(<ModalBackdrop closeModal={vi.fn()}><p>hello</p></ModalBackdrop>)
    const dialog = screen.getByRole("dialog")
    expect(dialog).toHaveAttribute("aria-modal", "true")
    expect(dialog).toHaveTextContent("hello")
  })

  it("closes on Escape", async () => {
    const closeModal = vi.fn()
    render(<ModalBackdrop closeModal={closeModal}><p>hi</p></ModalBackdrop>)
    await userEvent.keyboard("{Escape}")
    expect(closeModal).toHaveBeenCalledOnce()
  })

  it("closes when the backdrop itself is clicked", async () => {
    const closeModal = vi.fn()
    const { container } = render(<ModalBackdrop closeModal={closeModal}><p>hi</p></ModalBackdrop>)
    await userEvent.click(container.firstChild as HTMLElement)
    expect(closeModal).toHaveBeenCalled()
  })

  it("stops listening for Escape once unmounted", async () => {
    const closeModal = vi.fn()
    const { unmount } = render(<ModalBackdrop closeModal={closeModal}><p>hi</p></ModalBackdrop>)
    unmount()
    await userEvent.keyboard("{Escape}")
    expect(closeModal).not.toHaveBeenCalled()
  })
})

describe("Loading", () => {
  it("staggers one span per character", () => {
    const { container } = render(<Loading />)
    const spans = container.querySelectorAll("span")
    expect(spans).toHaveLength("Loading...".length)
    // each character starts fractionally later than the last
    const delays = [...spans].map(s => parseFloat(s.style.animationDelay))
    expect(delays[0]).toBeCloseTo(0.5)
    expect(delays[1]).toBeCloseTo(0.6)
    expect(delays).toEqual([...delays].sort((x, y) => x - y))
  })

  it("hides the decorative characters from screen readers", () => {
    const { container } = render(<Loading />)
    for (const span of container.querySelectorAll("span")) {
      expect(span).toHaveAttribute("aria-hidden", "true")
    }
  })
})

describe("UserBalance", () => {
  it("shows the loading animation while loading", () => {
    const { container } = render(<UserBalance className="b" balance="1.0" loading />)
    expect(container.querySelectorAll("span").length).toBe("Loading...".length)
  })

  it("shows the balance once loaded", () => {
    render(<UserBalance className="b" balance="12.5" loading={false} />)
    expect(screen.getByRole("heading")).toHaveTextContent("ETH12.5")
  })
})

describe("Backdrop", () => {
  it("renders a fixed full-bleed layer on the login route", () => {
    const { container } = render(<Backdrop location={location("/")} />)
    const el = container.firstChild as HTMLElement
    expect(el.style.position).toBe("fixed")
    expect(el.style.width).toBe("100%")
  })

  it("renders on an authenticated route too", () => {
    const { container } = render(<Backdrop location={location("/contribute")} />)
    expect(container.firstChild).toBeTruthy()
  })
})

describe("preference hooks", () => {
  it("reports reduced motion when the user asks for it", () => {
    setMatchingMediaQueries(["(prefers-reduced-motion: reduce)"])
    const { result } = renderHook(() => usePreferredMotion())
    expect(result.current).toBe("reduced")
    setMatchingMediaQueries([])
  })

  it("reports default motion otherwise", () => {
    setMatchingMediaQueries([])
    const { result } = renderHook(() => usePreferredMotion())
    expect(result.current).toBe("default")
  })

  it("reports the dark colour scheme when preferred", () => {
    setMatchingMediaQueries(["(prefers-color-scheme: dark)"])
    const { result } = renderHook(() => usePreferredTheme())
    expect(result.current).toBe("dark")
    setMatchingMediaQueries([])
  })

  it("reports light otherwise", () => {
    setMatchingMediaQueries([])
    const { result } = renderHook(() => usePreferredTheme())
    expect(result.current).toBe("light")
  })
})

describe("Typewriter", () => {
  it("eventually types the whole message out", async () => {
    vi.useRealTimers()
    render(<Typewriter className="t" message="Hello" setTalking={vi.fn()} />)
    await waitFor(
      () => expect(document.body.textContent).toContain("Hello"),
      { timeout: 4000 })
  })

  it("signals when it starts talking", async () => {
    const setTalking = vi.fn()
    render(<Typewriter className="t" message="Hi" setTalking={setTalking} />)
    await waitFor(() => expect(setTalking).toHaveBeenCalled(), { timeout: 4000 })
  })

  it("stops typing when unmounted mid-message", async () => {
    const setTalking = vi.fn()
    const { unmount } = render(
      <Typewriter className="t" message="A longer message here" setTalking={setTalking} />)
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })
    unmount()
    expect(() => setTalking).not.toThrow()
  })
})
