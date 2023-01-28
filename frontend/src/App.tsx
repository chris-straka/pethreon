import { Web3ContextProvider } from './context/Web3Context';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Contribute } from './pages/Contribute/Contribute';
import { Create } from './pages/Create/Create';

export const App = () => {
  const location = useLocation()

  /** 
   * The order in which things are laid out here is critical.
   * The onboard web3 account center MUST GO BELOW the b
   */
  return (
    <Web3ContextProvider>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} />
          <Route path="contribute" element={<Contribute />} />
          <Route path="create" element={<Create />} />
        </Routes>
    </Web3ContextProvider>
  );
}

export default App;
