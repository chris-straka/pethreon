import { Login } from './pages/login/login';
import { Contributor } from './pages/contributor_portal/contributor';
import { Creator } from './pages/creator_portal/creator';
import { Switch, Route } from 'react-router-dom';
import "./css/circles.css"

const App: React.FC = () => {
  const disablePortalButton = true;
  return (
    <>
      <Switch>
        <Login />
        <Contributor />
        <Creator />
      </Switch>
      <div className="circleA"></div>
      <button className="circleB" disabled={disablePortalButton}></button>
      <div className="circleC"></div>
    </>
  )
}

export default App;