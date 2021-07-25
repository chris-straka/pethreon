interface EtherDenominationProps {
  defaultChecked: boolean,
  denomination: string
};

export const EtherDenomination = ({ defaultChecked, denomination }: EtherDenominationProps) => {
  return <label>
    <input type="radio" name="currency" defaultChecked value="USD" />
    <span>USD</span>
  </label>
}