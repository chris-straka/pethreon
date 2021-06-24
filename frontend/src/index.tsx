import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Symfoni } from "./hardhat/SymfoniContext";
import App from './App';
import "./index.css";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <Symfoni autoInit={false}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Symfoni>
  </StrictMode>,
  document.getElementById('root')
);

// reportWebVitals(); 
// reportWebVitals(console.log) https://bit.ly/CRA-vitals