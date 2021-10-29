interface UserAddressProps {
  className: string,
  userAccountAddress: string
}

export const UserAddress = ({ className, userAccountAddress }: UserAddressProps) => {
  return (
    <h1 className={className}>{userAccountAddress}</h1>
  )
}