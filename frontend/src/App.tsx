import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { PethreonContract, Web3Context, Web3Provider } from './context/Web3Context'
import { AnimatePresence } from "framer-motion";
import { Login } from './pages/Login/Login';
import { Contribute } from './pages/Contribute/Contribute';
import { Create } from './pages/Create/Create';
import { Circles } from './components';

const PAGE_FADE_IN_DURATION = .5
const PAGE_FADE_OUT_DURATION = .5
const PAGE_FADE_OUT_DELAY = 0
const CIRCLE_ANIMATION_DURATION = .5

export const App = () => {
  const [currentWeb3Provider, setCurrentWeb3Provider] = useState<Web3Provider>(null)
  const [contract, setContract] = useState<PethreonContract>(null)
  const location = useLocation()

  return (
    <Web3Context.Provider value={{ currentWeb3Provider, setCurrentWeb3Provider, contract, setContract }}>
      <Circles
        circleAnimationDuration={CIRCLE_ANIMATION_DURATION}
        pageFadeInDuration={PAGE_FADE_IN_DURATION}
        pageFadeOutDuration={PAGE_FADE_OUT_DURATION}
      />
      <AnimatePresence mode='wait' initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <Login
              fadeInDuration={PAGE_FADE_IN_DURATION}
              fadeInDelay={CIRCLE_ANIMATION_DURATION}
              fadeOutDuration={PAGE_FADE_OUT_DURATION}
              fadeOutDelay={PAGE_FADE_OUT_DELAY}
            />
          }
          />
          <Route path="contribute" element={
            <Contribute
              fadeInDuration={PAGE_FADE_IN_DURATION}
              fadeInDelay={CIRCLE_ANIMATION_DURATION}
              fadeOutDuration={PAGE_FADE_OUT_DURATION}
              fadeOutDelay={PAGE_FADE_OUT_DELAY}
            />
          }
          />
          <Route path="create" element={
            <Create
              fadeInDuration={PAGE_FADE_IN_DURATION}
              fadeInDelay={CIRCLE_ANIMATION_DURATION}
              fadeOutDuration={PAGE_FADE_OUT_DURATION}
              fadeOutDelay={PAGE_FADE_OUT_DELAY}
            />
          }
          />
        </Routes>
      </AnimatePresence>
    </Web3Context.Provider>
  );
}

export default App;
