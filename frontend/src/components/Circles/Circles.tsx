import { useLocation, useHistory } from "react-router";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import contributeStyles from "./Contribute.module.css"
import createStyles from "./Create.module.css"
import loginStyles from "./Login.module.css"
const styles = { ...contributeStyles, ...createStyles, ...loginStyles }

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

  // Short circuit city 😎 
  return <>
    <div className={`
      ${loginPage && styles.circleA_login}
      ${contributePage && styles.circleA_contribute}
      ${createPage && styles.circleA_create}
    `} />
    <button className={`
      ${loginPage && styles.circleB_login} 
      ${contributePage && styles.circleB_login} 
      ${createPage && styles.circleB_create}
    `}
      onClick={switchPortals}
      disabled={loginPage ? true : false}
    >
      {contributePage && "Create "}
      {createPage && "Donate "}
      {!loginPage && <Arrow style={{ width: "2ch", verticalAlign: "bottom" }} />}
    </button>
    <div className={`
      ${loginPage && styles.circleC_login} 
      ${contributePage && styles.circleC_login} 
      ${createPage && styles.circleC_create}
    `} />
  </>
}