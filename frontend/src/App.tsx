import { Login } from './pages/login';
import "./css/circles.css"

const App: React.FC = () => {
  const disablePortalButton = true;
  return (
    <>
      <Login />
      <div className="circleA"></div>
      <button className="circleB" disabled={disablePortalButton}></button>
      <div className="circleC"></div>
    </>
  )
}

export default App;