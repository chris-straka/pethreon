import { createContext, useMemo, useState } from 'react';
import { Login } from './pages/login/login';
import { Contribute } from './pages/contribute/contribute';
import { Create } from './pages/create/create';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Circles } from './components/circles/circles';

const UserContext = createContext<{
  user: string | null,
  setUser: any | null // figure this out later
}>({
  user: null,
  setUser: null
})

const App: React.FC = () => {
  const [user, setUser] = useState(null)
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <>
      <Circles />
      <Switch>
        <UserContext.Provider value={userValue}>
          <Route path="/" exact component={Login} />
          <Route path="/contribute" exact component={Contribute} />
          <Route path="/create" exact component={Create} />
        </UserContext.Provider>
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default App;
