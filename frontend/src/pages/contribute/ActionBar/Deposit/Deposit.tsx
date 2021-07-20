import { ReactComponent as CautionSVG } from "../../../../assets/caution.svg"
import { useState } from "react"
import "./Deposit.css"

const warning = () => window.alert("This smart contract has not been professionally audited for security vulnerabilities. Please use at your own risk!")
const deposit = () => { }

const fetchData = async () => {
  const data = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD")
  console.log(data)
}

export const DepositModal = () => {
  const [disable, setDisable] = useState(true)
  // const [exchangeRateData, setExchangeRateData] = useState({})
  const checkboxChanged = () => setDisable(!disable)

  // useEffect(() => {
  //   fetch("")
  //     .then(data => setExchangeRateData(data))
  // }, [exchangeRateData])

  return (
    <form className="depositModal">
      <h3>How much to deposit?</h3>
      <p onClick={warning}><strong><CautionSVG className="cautionSVG" />Please read this first!<CautionSVG className="cautionSVG" /></strong> </p>
      <div className="consentContainer">
        <label htmlFor="consent">Do you accept?</label>
        <input type="checkbox" id="consent" onChange={checkboxChanged} />
      </div>
      <button onClick={deposit} disabled={disable}>Deposit</button>
      <button onClick={fetchData}>fetch data</button>
    </form>
  );
}

// curl -X 'GET' \
//   '' \
//   -H 'accept: application/json'