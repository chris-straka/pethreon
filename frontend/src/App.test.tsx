import { describe, expect, it, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { App } from "./App"

// The wallet is the one thing we can't run for real in jsdom.
const connect = vi.fn().mockResolvedValue([{ label: "MetaMask", provider: {} }])
vi.mock("@web3-onboard/react", () => ({
  useConnectWallet: () => [{ wallet: null, connecting: false }, connect],
  useSetChain: () => [{}, vi.fn()],
}))

const renderAt = (path: string) =>
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

beforeEach(() => localStorage.clear())

describe("App routing through AnimatePresence", () => {
  // AnimatePresence + Routes is the pairing most likely to break on a
  // framer-motion or react-router major bump.
  it("renders the login page at /", async () => {
    renderAt("/")
    expect(await screen.findByRole("button", { name: /log in/i })).toBeInTheDocument()
  })

  it("renders the decorative circles alongside the routed page", () => {
    const { container } = renderAt("/")
    expect(container.querySelectorAll("div[aria-hidden='true']").length).toBeGreaterThanOrEqual(3)
  })

  it("redirects an unauthenticated visitor away from /contribute", async () => {
    renderAt("/contribute")
    // PethreonProvider navigates home when there's no wallet
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument())
  })

  it("redirects an unauthenticated visitor away from /create", async () => {
    renderAt("/create")
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument())
  })

  it("keeps the login content above the backdrop and circles", () => {
    const { container } = renderAt("/")
    const main = container.querySelector("main")
    expect(main?.style.zIndex).toBe("4")
  })
})

describe("Login interaction", () => {
  it("asks web3-onboard to connect when the login button is clicked", async () => {
    renderAt("/")
    await userEvent.click(await screen.findByRole("button", { name: /log in/i }))
    await waitFor(() => expect(connect).toHaveBeenCalled())
  })
})
