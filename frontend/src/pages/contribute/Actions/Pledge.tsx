const pledge = () => { }

export const PledgeModal = () => {
  return (
    <div className="pledgeModal">
      <p>How much would you like to Pledge?</p>
      <input type="text" />
      <p>Who would you like to pledge to?</p>
      <input type="text" />
      <button onClick={pledge}>pledge</button>
    </div>
  )
}