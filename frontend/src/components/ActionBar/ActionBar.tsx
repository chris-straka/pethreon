import { ReactNode } from "react"

interface ActionBarProps {
  className?: string,
  children: ReactNode,
}

export const ActionBar = ({ className, children }: ActionBarProps) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        fontSize: 'var(--font-size-md)',
        marginTop: '2vh',
      }}
    >{children}</div>
  );
}