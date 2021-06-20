import { useState, useEffect } from 'react';
import { Login } from './pages/login/login';
import { Contribute } from './pages/contribute/contribute';
import { Create } from './pages/create/create';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import "./css/login.css";

const App: React.FC = () => {
  const [disablePortalButton, setDisablePortalButton] = useState(true)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const loginPage = location.pathname === '/'
    const contributePage = location.pathname === '/contribute'
    const creatorPage = location.pathname === '/create'

    if (loginPage) {
      setDisablePortalButton(true)
      console.log("index")
    }
    if (contributePage) {
      setDisablePortalButton(false)
      console.log("contributor")
    }
    if (creatorPage) {
      setDisablePortalButton(false)
      console.log("creator")
    }
  }, [location])

  const switchPortals = () => {
    history.push("/create")
  }


  return (
    <>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/contribute" exact component={Contribute} />
        <Route path="/create" exact component={Create} />
        <Redirect to="/" />
      </Switch>
      <div className="circleA" />
      <button className="circleB" onClick={switchPortals} disabled={disablePortalButton} />
      <div className="circleC" />
    </>
  )
}

export default App;
