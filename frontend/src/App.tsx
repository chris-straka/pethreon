import { useMemo, useState, useContext } from 'react';
import { Login } from './pages/login/login';
import { ContributePage } from './pages/contribute/contribute';
import { CreatePage } from './pages/create/create';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Circles } from './components/Circles/Circles';
import { PethreonContext } from './PethreonContext';

const App: React.FC = () => {
  const [userAddress, setUserAddress] = useState("")
  const [provider, setProvider] = useState("")
  const [contract, setContract] = useState(null)
  const { contractAddress } = useContext(PethreonContext)

  const pethreon_context_value = useMemo(() => ({
    contractAddress,
    userAddress, setUserAddress,
    provider, setProvider,
    contract, setContract
  }), [userAddress, provider, contract, contractAddress])

  return <>
    <Circles />
    <PethreonContext.Provider value={pethreon_context_value}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/contribute" exact component={ContributePage} />
        <Route path="/create" exact component={CreatePage} />
        <Redirect to="/" />
      </Switch>
    </PethreonContext.Provider>
  </>
}

export default App;
