import { ReactComponent as CautionSVG } from "../../../../assets/caution.svg"
import { useState, ChangeEvent } from "react"
import "./Deposit.css"

const deposit = () => { }

export const DepositModal = () => {
  const [disable, setDisable] = useState(true)
  const checkboxChanged = (e: ChangeEvent<HTMLInputElement>) => setDisable(!disable)

  const tada = () => window.alert("This smart contract has not been professionally audited for security issues. Please use at your own risk.")

  return (
    <div className="depositModal">
      <h3>How much to deposit? (Ether)</h3>
      <input type="text" />
      <strong onClick={tada}>Caution! <CautionSVG className="cautionSVG" /></strong>
      <p>This smart contract has not been professionally audited for security issues. Please use at your own risk.</p>
      <div className="consentContainer">
        <label htmlFor="consent">I understand and accept</label>
        <input type="checkbox" id="consent" onChange={checkboxChanged} />
      </div>
      <button onClick={deposit} disabled={disable}>Deposit</button>
    </div>
  );
}