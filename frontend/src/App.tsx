import { Login } from './pages/login/login';
import { ContributePage } from './pages/contribute/contribute';
import { CreatePage } from './pages/create/create';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Circle } from './components/Circles';
import { CircleButton } from './components/Circles'

const App = () => {
  const location = useLocation()
  return (
    <>
      <Circle></Circle>
      <Circle></Circle>
      <CircleButton></CircleButton>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={Login} />
        <Route path="/contribute" exact component={ContributePage} />
        <Route path="/create" exact component={CreatePage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
