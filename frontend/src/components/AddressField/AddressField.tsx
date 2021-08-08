import { ChangeEvent } from 'react';
import styles from "./AddressField.module.css"

interface CurrencySelectProps {
  address: string,
  getAddress: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const AddressField = ({ address, getAddress }: CurrencySelectProps) => {
  return <input
    type="text"
    required
    placeholder="0x0000000000000000000000000000000000000000"
    onChange={getAddress}
    value={address}
  />
}
