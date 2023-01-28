import { Web3ContextProvider } from './context/Web3Context';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { Login } from './pages/Login/Login';
import { Contribute } from './pages/Contribute/Contribute';
import { Create } from './pages/Create/Create';
import { Backdrop } from './components';


export const App = () => {
  const location = useLocation()

  /** 
   * The order in which things are laid out here is critical.
   * The onboard web3 account center MUST GO BELOW the b
   */
  return (
    <Web3ContextProvider>
      <Backdrop />
      <AnimatePresence mode='wait' initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} />
          <Route path="contribute" element={<Contribute />} />
          <Route path="create" element={<Create />} />
        </Routes>
      </AnimatePresence>
    </Web3ContextProvider>
  );
}

export default App;
