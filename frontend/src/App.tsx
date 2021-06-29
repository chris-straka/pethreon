import { useMemo, useState } from 'react';
import { Login } from './pages/login/login';
import { Contribute } from './pages/contribute/contribute';
import { Create } from './pages/create/create';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Circles } from './components/circles/circles';
import { UserContext } from './UserContext';

const App: React.FC = () => {
  const [user, setUser] = useState("")
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser])

  return <>
    <Circles />
    <UserContext.Provider value={userValue}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/contribute" exact component={Contribute} />
        <Route path="/create" exact component={Create} />
        <Redirect to="/" />
      </Switch>
    </UserContext.Provider>
  </>
}

export default App;
