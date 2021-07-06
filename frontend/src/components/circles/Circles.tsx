import { useLocation, useHistory } from "react-router";
import { ContributeSVG } from "./SVGs/ContributeSVG";
import { CreateSVG } from "./SVGs/CreateSVG";
import "./contribute.css";
import "./create.css";
import "./login.css";

export const Circles = () => {
  const history = useHistory()
  const location = useLocation()
  const loginPage = location.pathname === '/'
  const contributePage = location.pathname === '/contribute'
  const createPage = location.pathname === '/create'

  const switchPortals = () => {
    if (contributePage) history.push("/create")
    if (createPage) history.push("/contribute")
  }

  // Circle animation depends on the route
  const circleAnimation = (page: string) => {
    if (createPage) return `circle${page}_create`
    if (contributePage) return `circle${page}_contribute`
    return `circle${page}`
  }

  return <>
    <div className={circleAnimation("A")} />
    <button className={circleAnimation("B")} onClick={switchPortals} disabled={loginPage ? true : false}>
      {contributePage ? "Creator Portal " : ""}
      {contributePage ? <CreateSVG /> : ""}
      {createPage ? "Contribute Portal " : ""}
      {createPage ? <ContributeSVG /> : ""}
    </button>
    <div className={circleAnimation("C")} />
  </>
}