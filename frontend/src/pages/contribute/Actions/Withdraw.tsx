
const withdraw = () => {}

export const WithdrawModal = () => {
  return (
    <div className="withdrawModal">
      <p>How much would you like to withdraw in Ether?</p >
      <input type="text" />
      <button onClick={withdraw}>Withdraw</button>
    </div>
  )
}