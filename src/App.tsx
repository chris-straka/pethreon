import React from 'react';
import './App.css';

declare global {
  interface Window {
    ethereum?: any  // TS
  }
}

const App = () => {

  if (typeof <Window>window.ethereum !== 'undefined') {
    console.log("metamask is installed")
  }
  else {
    console.log("nop")
  }

  return (<main>Hello</main>);
}

export default App;
