import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { Login } from './pages/Login/Login';
import { Contribute } from './pages/Contribute/Contribute';
import { Create } from './pages/Create/Create';
import { Circles, Backdrop } from './components';

const PAGE_FADE_IN_DURATION = .5
const PAGE_FADE_OUT_DURATION = .5
const PAGE_FADE_OUT_DELAY = 0
const CIRCLE_ANIMATION_DURATION = .5

export const App = () => {
  const location = useLocation()

  /** 
   * The order in which things are laid out here is critical.
   * From bottom to top these things need to overlap 
   * web3-account-center > Backdrop > Circles > Pages
   */
  return (
    <>
      <Backdrop
        backdropAnimationDelay={PAGE_FADE_OUT_DURATION + PAGE_FADE_OUT_DELAY}
        backdropAnimationDuration={CIRCLE_ANIMATION_DURATION + PAGE_FADE_IN_DURATION}
      />
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
    </>
  );
}

export default App;
