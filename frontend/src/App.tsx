import { Login } from './pages/login/login';
import { ContributePage } from './pages/contribute/contribute';
import { CreatePage } from './pages/create/create';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CircleA, CircleB, CircleC } from './Circles';

const PAGE_TRANSITION_DURATION = 1
const CIRCLE_ANIMATION_DURATION = 1

const App = () => {
  const location = useLocation()
  return (
    <>
      <CircleA delay={PAGE_TRANSITION_DURATION} duration={CIRCLE_ANIMATION_DURATION} />
      <CircleB delay={PAGE_TRANSITION_DURATION} duration={CIRCLE_ANIMATION_DURATION} />
      <CircleC delay={PAGE_TRANSITION_DURATION} duration={CIRCLE_ANIMATION_DURATION} />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <Route path="/contribute" exact component={ContributePage} />
          <Route path="/create" exact component={CreatePage} />
          <Route path="/" exact component={Login} />
          <Redirect to="/" />
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
