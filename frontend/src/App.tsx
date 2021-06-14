import { Login } from './pages/login';
import "./css/circles.css"


const App: React.FC = () => {
  const disabled = true;
  return (
    <>
      <Login />
      <div className="circleA"></div>
      <button className="circleB" disabled={disabled}></button>
      <div className="circleC"></div>
    </>
  )
}

export default App;