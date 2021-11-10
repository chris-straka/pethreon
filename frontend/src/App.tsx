import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Login } from './pages/login/login';
import { Contribute } from './pages/contribute/contribute';
import { Create } from './pages/create/create';
import { CircleA, CircleB, CircleC } from './circles';

const PAGE_FADE_IN_DURATION = .5
const PAGE_FADE_OUT_DURATION = .5
const PAGE_FADE_OUT_DELAY = 0
const CIRCLE_ANIMATION_DURATION = .5

const App = () => {
  const location = useLocation()
  return (
    <>
      <CircleA duration={CIRCLE_ANIMATION_DURATION} delay={PAGE_FADE_OUT_DURATION} />
      <CircleB duration={CIRCLE_ANIMATION_DURATION} delay={PAGE_FADE_OUT_DURATION} />
      <CircleC duration={CIRCLE_ANIMATION_DURATION} delay={PAGE_FADE_OUT_DURATION}
        textDelay={PAGE_FADE_OUT_DURATION + PAGE_FADE_IN_DURATION} />
      <AnimatePresence exitBeforeEnter initial={false}>
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
          <Route path="/contribute" element={
            <Contribute
              fadeInDuration={PAGE_FADE_IN_DURATION}
              fadeInDelay={CIRCLE_ANIMATION_DURATION}
              fadeOutDuration={PAGE_FADE_OUT_DURATION}
              fadeOutDelay={PAGE_FADE_OUT_DELAY}
            />
          }
          />
          <Route path="/create" element={
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
