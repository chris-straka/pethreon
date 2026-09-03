import { describe, expect, it, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { Create } from "./Create"
import { PethreonContext } from "../../hooks/pethreonContext"
import type { Pethreon, PledgeType } from "../../types"

vi.mock("@web3-onboard/react", () => ({
  useConnectWallet: () => [{ wallet: { provider: {} }, connecting: false }, vi.fn()],
}))

const pledge = () => ({
  creatorAddress: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  contributorAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  weiPerPeriod: 10n ** 18n,
  duration: 3n,
  dateCreated: 1621555200n,
  periodExpires: 3n,
  status: 0n,
}) as unknown as PledgeType

const fakeContract = (over: Partial<Record<string, unknown>> = {}) => ({
  getCreatorBalanceInWei: vi.fn().mockResolvedValue(5n * 10n ** 18n),
  getCreatorPledges: vi.fn().mockResolvedValue([]),
  getExpiredPledges: vi.fn().mockResolvedValue([]),
  getAddress: vi.fn().mockResolvedValue("0xcontract"),
  creatorWithdraw: vi.fn().mockResolvedValue({ wait: vi.fn().mockResolvedValue({}) }),
  ...over,
}) as unknown as Pethreon

const renderPage = (contract: Pethreon | null) =>
  render(
    <MemoryRouter initialEntries={["/create"]}>
      <PethreonContext.Provider value={contract}>
        <Create />
      </PethreonContext.Provider>
    </MemoryRouter>)

beforeEach(() => {
  localStorage.clear()
  vi.spyOn(window, "alert").mockImplementation(() => { })
})

describe("Create page", () => {
  it("shows the creator's withdrawable balance", async () => {
    renderPage(fakeContract())
    expect(await screen.findByText("5.0")).toBeInTheDocument()
  })

  it("records the page for the login redirect", async () => {
    renderPage(fakeContract())
    await waitFor(() => expect(localStorage.getItem("last_page_visited")).toBe("create"))
  })

  it("says so when nobody has pledged yet", async () => {
    renderPage(fakeContract())
    expect(await screen.findByText(/nobody has pledged to you yet/i)).toBeInTheDocument()
  })

  it("lists contributors who have pledged", async () => {
    renderPage(fakeContract({ getCreatorPledges: vi.fn().mockResolvedValue([pledge()]) }))
    expect(await screen.findByText(/0x70997970C51812dc3A010C7d01b50e0d17dc79C8/)).toBeInTheDocument()
  })

  // This button used to be onClick={() => console.log("hey")}.
  it("actually calls creatorWithdraw when Withdraw is clicked", async () => {
    const contract = fakeContract()
    renderPage(contract)
    await screen.findByText("5.0")
    await userEvent.click(screen.getByRole("button", { name: /withdraw/i }))
    await waitFor(() => expect(contract.creatorWithdraw).toHaveBeenCalledOnce())
  })

  it("waits for the withdrawal to be mined, then refreshes the balance", async () => {
    const wait = vi.fn().mockResolvedValue({})
    const contract = fakeContract({
      creatorWithdraw: vi.fn().mockResolvedValue({ wait }),
    })
    renderPage(contract)
    await screen.findByText("5.0")
    await userEvent.click(screen.getByRole("button", { name: /withdraw/i }))
    await waitFor(() => expect(wait).toHaveBeenCalled())
    // balance is re-read after the transaction confirms
    await waitFor(() =>
      expect(contract.getCreatorBalanceInWei).toHaveBeenCalledTimes(2))
  })

  it("refuses to withdraw when there is nothing to withdraw", async () => {
    const contract = fakeContract({ getCreatorBalanceInWei: vi.fn().mockResolvedValue(0n) })
    renderPage(contract)
    await screen.findByText("0.0")
    await userEvent.click(screen.getByRole("button", { name: /withdraw/i }))
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/nothing to withdraw/i))
    expect(contract.creatorWithdraw).not.toHaveBeenCalled()
  })

  it("surfaces a rejected withdrawal instead of hanging on the spinner", async () => {
    const contract = fakeContract({
      creatorWithdraw: vi.fn().mockRejectedValue({ message: "user rejected" }),
    })
    renderPage(contract)
    await screen.findByText("5.0")
    await userEvent.click(screen.getByRole("button", { name: /withdraw/i }))
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/user rejected/)))
    // the old reducer made setLoading(false) resolve to true, wedging this
    await waitFor(() => expect(screen.getByText("5.0")).toBeInTheDocument())
  })

  it("offers a CSV export", async () => {
    renderPage(fakeContract())
    expect(await screen.findByRole("button", { name: /csv/i })).toBeInTheDocument()
  })
})
