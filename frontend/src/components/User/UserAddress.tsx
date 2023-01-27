interface UserAddressProps {
  className: string,
  userAccountAddress: string
}

export const UserAddress = ({ className, userAccountAddress }: UserAddressProps) => {
  return (
    <h1
      className={className}
      style={{
        display: 'none',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >{userAccountAddress}</h1>
  )
}