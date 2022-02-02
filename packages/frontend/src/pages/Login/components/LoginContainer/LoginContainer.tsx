import { MetamaskSVG } from "../../../../svgs/MetamaskSVG/MetamaskSVG"

interface LoginContainerProps {
  containerStyles: string,
  buttonStyles: string,
  talking: boolean,
  onClick: (() => void)
}

export const LoginContainer = ({ containerStyles, buttonStyles, talking, onClick }: LoginContainerProps) => {
  return (
    <div className={containerStyles}>
      <MetamaskSVG talking={talking} />
      <button className={buttonStyles} onClick={onClick}>Login With Metamask</button>
    </div>
  )
}
