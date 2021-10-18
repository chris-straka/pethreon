import { Login } from './pages/login/login';
import { ContributePage } from './pages/contribute/contribute';
import { CreatePage } from './pages/create/create';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const PAGE_FADEOUT_DURATION = 1
const CIRCLE_ANIMATION_DURATION = 1

const App = () => {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={Login} />
        <Route path="/contribute" exact component={ContributePage} />
        <Route path="/create" exact component={CreatePage} />
        <Redirect to="/" />
      </Switch>
    </AnimatePresence>
  );
}

export default App;
