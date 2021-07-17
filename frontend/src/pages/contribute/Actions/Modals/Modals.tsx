import { ReactComponent as CautionSVG } from "../../../../assets/warning.svg"

export const DepositModal = () => {
  return <>
    <p>How much would like to deposit in Ether?</p>
    <input type="text" />
  </>
}

export const WithdrawModal = () => {
  return <>
    <p>How much would you like to withdraw in Ether?</p>
    <input type="text" />
  </>
}

export const PledgeModal = () => {
  return <>
    <p>How much would you like to Pledge?</p>
    <input type="text" />
    <p>Who would you like to pledge to?</p>
    <input type="text" />
  </>
}

export const CautionModal = () => {
  return <>
    <strong>Warning! <CautionSVG /></strong>
    <p>This smart contract has not been professionally audited for security issues. Use at your own risk.</p>
    <label htmlFor="user-consent">I understand and accept</label>
    <input type="checkbox" id="user-consent" />
  </>
}