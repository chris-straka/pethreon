import { Login } from './pages/login/login';
import { Contribute } from './pages/contribute/contribute';
import { Create } from './pages/create/create';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import "./pages/contribute/circle.css";
import "./pages/create/circle.css";
import "./pages/login/circle.css";

const App: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const loginPage = location.pathname === '/'
  const contributePage = location.pathname === '/contribute'
  const createPage = location.pathname === '/create'

  const switchPortals = () => {
    if (contributePage) { history.push("/create") }
    if (createPage) { history.push("/contribute") }
  }

  const circleAnimation = (typeOfCircle: string) => {
    if (createPage) return `circle${typeOfCircle}_create`
    if (contributePage) return `circle${typeOfCircle}_contribute`
    return `circle${typeOfCircle}`
  }

  return (
    <>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/contribute" exact component={Contribute} />
        <Route path="/create" exact component={Create} />
        <Redirect to="/" />
      </Switch>
      <div className={circleAnimation("A")} />
      <button className={circleAnimation("B")} onClick={switchPortals} disabled={loginPage ? true : false} >
        {contributePage ? "Switch to Creator Portal" : ""}
        {createPage ? "Switch to Contributor Portal" : ""}
      </button>
      <div className={circleAnimation("C")}
      />
    </>
  )
}

export default App;
