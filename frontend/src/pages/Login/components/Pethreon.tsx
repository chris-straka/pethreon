interface PethreonProps {
  className: string
}

export const Pethreon = ({ className }: PethreonProps) => (
  <h1 className={className}>P<span style={{ fontSize: 'smaller' }}>Ξ</span>threon</h1>
)