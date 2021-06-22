import { useHistory } from "react-router-dom"
import "./contribute.css"
import "./circle.css"

export const Contribute: React.FC = () => {
  const history = useHistory()
  const user = localStorage?.getItem("account")

  if (!user) history.push("/")

  return <h1>{user}</h1>
}