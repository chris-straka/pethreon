import { Login } from './pages/login/login';
import { Contribute } from './pages/contribute/contribute';
import { Create } from './pages/create/create';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import "./circles/create.css";
import "./circles/contribute.css";
import "./circles/login.css";

const App: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const loginPage = location.pathname === '/'
  const contributePage = location.pathname === '/contribute'
  const createPage = location.pathname === '/create'

  const switchToCreator = () => {
    history.push("/create")
  }

  const switchToContributor = () => {
    history.push("/contribute")
  }

  // const circleAnimation = (typeOfCircle: string) => {
  //   if (loginPage) return `circle${typeOfCircle}_login`
  //   if (createPage) return `circle${typeOfCircle}_create`
  //   if (contributePage) return `circle${typeOfCircle}_contribute`
  // }

  return (
    <>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/contribute" exact component={Contribute} />
        <Route path="/create" exact component={Create} />
        <Redirect to="/" />
      </Switch>
      <div
        className={`
        circleA 
        ${contributePage ? "circleA_contribute" : ""}
        ${createPage ? "circleA_create" : ""}
        `}
      />
      <button
        onClick={contributePage ? switchToCreator : switchToContributor}
        disabled={loginPage ? true : false}
        className={`
        circleB
        ${contributePage ? "circleB_contribute" : ""}
        ${createPage ? "circleB_create" : ""}
        `}
      />
      <div className={`
        circleC 
        ${contributePage ? "circleC_contribute" : ""}
        ${createPage ? "circleC_create" : ""} 
        `}
      />
    </>
  )
}

export default App;
