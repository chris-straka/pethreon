import { useHistory } from "react-router-dom"
import "./create.css"
import "./circle.css"

export const Create: React.FC = () => {
  const history = useHistory()
  const user = localStorage?.getItem("account")

  if (!user) { history.push("/") }

  return <h1>{user}</h1>
}