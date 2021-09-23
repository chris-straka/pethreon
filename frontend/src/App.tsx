import { AnimatePresence } from "framer-motion"
import { Login } from './pages/login/login';
import { ContributePage } from './pages/contribute/contribute';
import { CreatePage } from './pages/create/create';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Circles } from './components/Circles/Circles';

const App = () => <>
  <Circles />
  <AnimatePresence>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/contribute" exact component={ContributePage} />
      <Route path="/create" exact component={CreatePage} />
      <Redirect to="/" />
    </Switch>
  </AnimatePresence>
</>

export default App;
