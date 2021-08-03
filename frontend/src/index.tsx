import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./index.css";
// import reportWebVitals from './reportWebVitals';

render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

// reportWebVitals(); 
// reportWebVitals(console.log) https://bit.ly/CRA-vitals