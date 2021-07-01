import { useMemo, useState, useContext } from 'react';
import { Login } from './pages/login/login';
import { Contribute } from './pages/contribute/contribute';
import { Create } from './pages/create/create';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Circles } from './components/circles/circles';
import { PethreonContext } from './PethreonContext';

const App: React.FC = () => {
  const [userAddress, setUserAddress] = useState("")
  const [provider, setProvider] = useState("")
  const [contract, setContract] = useState("")
  const { contractAddress } = useContext(PethreonContext)

  const pethreon_context_value = useMemo(() => ({
    contractAddress,
    userAddress, setUserAddress,
    provider, setProvider,
    contract, setContract
  }), [userAddress, provider, contract])

  return <>
    <Circles />
    <PethreonContext.Provider value={pethreon_context_value}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/contribute" exact component={Contribute} />
        <Route path="/create" exact component={Create} />
        <Redirect to="/" />
      </Switch>
    </PethreonContext.Provider>
  </>
}

export default App;
