import styles from "./UserAddress.module.scss"

interface UserAddressProps {
  className: string,
  userAccountAddress: string
}

export const UserAddress = ({ className, userAccountAddress }: UserAddressProps) => {
  return (
    <h1 className={`${className} ${styles.userAddress}`}>{userAccountAddress}</h1>
  )
}