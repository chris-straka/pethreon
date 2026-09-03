import { describe, expect, it, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { Contribute } from "./Contribute"
import { PethreonContext } from "../../hooks/pethreonContext"
import type { Pethreon, PledgeType } from "../../types"

vi.mock("@web3-onboard/react", () => ({
  useConnectWallet: () => [{ wallet: { provider: {} }, connecting: false }, vi.fn()],
}))

const pledge = (over: Partial<PledgeType> = {}) => ({
  creatorAddress: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  contributorAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  weiPerPeriod: 10n ** 18n,
  duration: 3n,
  dateCreated: 1621555200n,
  periodExpires: 3n,
  status: 0n,
  ...over,
}) as unknown as PledgeType

const fakeContract = (over: Partial<Record<string, unknown>> = {}) => ({
  getContributorBalanceInWei: vi.fn().mockResolvedValue(2n * 10n ** 18n),
  getContributorPledges: vi.fn().mockResolvedValue([]),
  getAddress: vi.fn().mockResolvedValue("0xcontract"),
  ...over,
}) as unknown as Pethreon

const renderPage = (contract: Pethreon | null) =>
  render(
    <MemoryRouter initialEntries={["/contribute"]}>
      <PethreonContext.Provider value={contract}>
        <Contribute />
      </PethreonContext.Provider>
    </MemoryRouter>)

beforeEach(() => localStorage.clear())

describe("Contribute page", () => {
  it("shows the contributor's balance in ether", async () => {
    renderPage(fakeContract())
    expect(await screen.findByText("2.0")).toBeInTheDocument()
  })

  it("records the page for the login redirect", async () => {
    renderPage(fakeContract())
    await waitFor(() => expect(localStorage.getItem("last_page_visited")).toBe("contribute"))
  })

  it("prompts for a first pledge when there are none", async () => {
    renderPage(fakeContract())
    expect(await screen.findByText(/need to make a pledge first/i)).toBeInTheDocument()
  })

  it("lists existing pledges with their creator and terms", async () => {
    renderPage(fakeContract({ getContributorPledges: vi.fn().mockResolvedValue([pledge()]) }))
    expect(await screen.findByText(/0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC/)).toBeInTheDocument()
    expect(screen.getByText(/1\.0 per day/)).toBeInTheDocument()
    expect(screen.getByText(/3 days/)).toBeInTheDocument()
  })

  it("offers deposit, withdraw and pledge actions", async () => {
    renderPage(fakeContract())
    for (const name of [/deposit/i, /withdraw/i, /pledge/i]) {
      expect(await screen.findByRole("button", { name })).toBeInTheDocument()
    }
  })

  it("opens the deposit modal as an accessible dialog", async () => {
    renderPage(fakeContract())
    await userEvent.click(await screen.findByRole("button", { name: /deposit/i }))
    const dialog = await screen.findByRole("dialog")
    expect(dialog).toHaveAttribute("aria-modal", "true")
    expect(await screen.findByText(/how much to deposit/i)).toBeInTheDocument()
  })

  it("closes the deposit modal on Escape", async () => {
    renderPage(fakeContract())
    await userEvent.click(await screen.findByRole("button", { name: /deposit/i }))
    expect(await screen.findByRole("dialog")).toBeInTheDocument()
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
  })

  it("keeps deposit submission disabled until the disclaimer is accepted", async () => {
    renderPage(fakeContract())
    await userEvent.click(await screen.findByRole("button", { name: /deposit/i }))
    await screen.findByRole("dialog")

    const consent = screen.getByRole("checkbox")
    expect(consent).not.toBeChecked()

    const submitOf = () => screen.getByRole("dialog")
      .querySelector<HTMLButtonElement>("button[type='submit']")!
    expect(submitOf()).toBeDisabled()

    await userEvent.click(consent)
    expect(consent).toBeChecked()
    await waitFor(() => expect(submitOf()).toBeEnabled())
  })

  it("opens the pledge modal with its three inputs", async () => {
    renderPage(fakeContract())
    await userEvent.click(await screen.findByRole("button", { name: /pledge/i }))
    expect(await screen.findByText(/how much to pledge per day/i)).toBeInTheDocument()
    expect(screen.getByText(/across how many days/i)).toBeInTheDocument()
    expect(screen.getByText(/to which ethereum address/i)).toBeInTheDocument()
  })
})
