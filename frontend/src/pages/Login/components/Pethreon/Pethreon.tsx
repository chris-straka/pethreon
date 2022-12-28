import styles from "./Pethreon.module.scss"

interface PethreonProps {
  className: string
}

export const Pethreon = ({ className }: PethreonProps) => (
  <h1 className={`${className} ${styles.pethreon}`}>P<span>Ξ</span>threon</h1>
)