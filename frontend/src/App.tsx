import { Login } from './pages/login/login';
import { Contribute } from './pages/contribute/contribute';
import { Create } from './pages/create/create';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import "./pages/contribute/circle.css";
import "./pages/create/circle.css";


const App: React.FC = () => {
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

  return (
    <>
      <div className={circleAnimation("A")} />
      <button className={circleAnimation("B")} onClick={switchPortals} disabled={loginPage ? true : false} >
        {contributePage ? "Switch to Creator Portal" : ""}
        {createPage ? "Switch to Contributor Portal" : ""}
      </button>
      <div className={circleAnimation("C")} />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/contribute" exact component={Contribute} />
        <Route path="/create" exact component={Create} />
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default App;
