import { AnimatePresence } from 'motion/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Login, Contribute, Create } from './pages';
import { Circles, Backdrop } from './components';
import { PethreonProvider } from './hooks';

export const App = () => {
  const location = useLocation()

  /** 
   * The order in which things are laid out here matters.
   * @web3-onboard account-center > Backdrop > Circles > Content
   */
  return (
    <>
      <Backdrop location={location}/>
      <Circles />
      <AnimatePresence mode='wait' initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} />
          <Route path="contribute" element={<PethreonProvider><Contribute /></PethreonProvider>} />
          <Route path="create" element={<PethreonProvider><Create /></PethreonProvider>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
