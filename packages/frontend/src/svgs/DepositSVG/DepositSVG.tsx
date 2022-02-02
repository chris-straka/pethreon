interface DepositSVGProps {
  className?: string
}

export const DepositSVG = ({ className }: DepositSVGProps) => {
  return (
    <svg className={className} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
      <path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' /><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 176v160M336 256H176' />
    </svg>
  )
}