import { Login } from './pages/login/login';
import { ContributePage } from './pages/contribute/contribute';
import { CreatePage } from './pages/create/create';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/contribute" exact component={ContributePage} />
        <Route path="/create" exact component={CreatePage} />
        <Route path="/" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    </AnimatePresence>
  );
}

export default App;
