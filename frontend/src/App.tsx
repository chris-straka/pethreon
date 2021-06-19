import { Login } from './pages/login/login';
import { Contribute } from './pages/contributor_portal/contributor';
import { Create } from './pages/creator_portal/creator';
import { Switch, Route, Redirect } from 'react-router-dom';
import "./css/circles.css"

const App: React.FC = () => {
  const disablePortalButton = true;
  return (
    <>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/contribute" exact component={Contribute} />
        <Route path="/create" exact component={Create} />
        <Redirect to="/" />
      </Switch>
      <div className="circleA" />
      <button className="circleB" disabled={disablePortalButton}/>
      <div className="circleC" />
    </>
  )
}

export default App;