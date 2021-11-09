import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Login } from './pages/login/login';
import { Contribute } from './pages/contribute/contribute';
import { Create } from './pages/create/create';
import { CircleA, CircleB, CircleC } from './circles';

const PAGE_TRANSITION_DURATION = 1
const CIRCLE_ANIMATION_DURATION = 1

const App = () => {
  const location = useLocation()
  return (
    <>
      <CircleA delay={PAGE_TRANSITION_DURATION} duration={CIRCLE_ANIMATION_DURATION} />
      <CircleB delay={PAGE_TRANSITION_DURATION} duration={CIRCLE_ANIMATION_DURATION} />
      <CircleC delay={PAGE_TRANSITION_DURATION} duration={CIRCLE_ANIMATION_DURATION} />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <Login
              transitionDelay={CIRCLE_ANIMATION_DURATION}
              transitionDuration={PAGE_TRANSITION_DURATION}
            />
          }
          />
          <Route path="/contribute" element={
            <Contribute
              transitionDelay={CIRCLE_ANIMATION_DURATION}
              transitionDuration={PAGE_TRANSITION_DURATION}
            />
          }
          />
          <Route path="/create" element={
            <Create
              transitionDelay={CIRCLE_ANIMATION_DURATION}
              transitionDuration={PAGE_TRANSITION_DURATION}
            />
          }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
