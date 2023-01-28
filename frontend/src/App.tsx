import { Web3Context } from './context/Web3Context';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { Login } from './pages/Login/Login';
import { Contribute } from './pages/Contribute/Contribute';
import { Create } from './pages/Create/Create';
import { Backdrop } from './components';

const PAGE_FADE_IN_DURATION = .5
const PAGE_FADE_OUT_DURATION = .5
const CIRCLE_ANIMATION_DURATION = .5

export const App = () => {
  const location = useLocation()

  /** 
   * The order in which things are laid out here is critical.
   * From bottom to top these things need to overlap 
   * web3-account-center > Backdrop > Circles > Pages
   */
  return (
    <Web3Context>
      <Backdrop
        backdropAnimationDelay={PAGE_FADE_OUT_DURATION}
        backdropAnimationDuration={CIRCLE_ANIMATION_DURATION + PAGE_FADE_IN_DURATION}
      />
      <AnimatePresence mode='wait' initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <Login
              pageFadeInDuration={PAGE_FADE_IN_DURATION}
              circleAnimationDuration={CIRCLE_ANIMATION_DURATION}
              pageFadeOutDuration={PAGE_FADE_OUT_DURATION}
            />
          }
          />
          <Route path="contribute" element={
            <Contribute
              pageFadeInDuration={PAGE_FADE_IN_DURATION}
              circleAnimationDuration={CIRCLE_ANIMATION_DURATION}
              pageFadeOutDuration={PAGE_FADE_OUT_DURATION}
            />
          }
          />
          <Route path="create" element={
            <Create
              fadeInDuration={PAGE_FADE_IN_DURATION}
              circleAnimationDuration={CIRCLE_ANIMATION_DURATION}
              pageFadeOutDuration={PAGE_FADE_OUT_DURATION}
            />
          }
          />
        </Routes>
      </AnimatePresence>
    </Web3ContextProvider>
  );
}

export default App;
