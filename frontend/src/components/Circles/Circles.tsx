import { useLocation, useHistory } from "react-router";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import "./CSS/Animations.css"
import "./CSS/Login.css"
import "./CSS/Create.css"
import "./CSS/Contribute.css"

export const Circles = () => {
  const history = useHistory()
  const location = useLocation()
  const loginPage = location.pathname === '/'
  const contributePage = location.pathname === '/contribute'
  const createPage = location.pathname === '/create'

  const switchPortals = () => {
    if (contributePage) history.replace("/create")
    if (createPage) history.replace("/contribute")
  }

  const circleCSS = (circle: string) => {
    if (loginPage) return `circle${circle}_login`
    if (contributePage) return `circle${circle}_contribute`
    if (createPage) return `circle${circle}_create`
  }

  return <>
    <div className={circleCSS("A")} />
    <button className={circleCSS("B")} onClick={switchPortals} disabled={loginPage ? true : false} >
      {contributePage && "Create "}
      {createPage && "Donate "}
      {!loginPage && <Arrow style={{ width: "2ch", verticalAlign: "bottom" }} />}
    </button>
    <div className={circleCSS("C")} />
  </>
}