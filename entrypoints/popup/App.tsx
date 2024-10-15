import { useState, useEffect } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';

function App() {
  /////////// STATE VARIABLES //////////
  const [backendData, setBackendData] = useState();
  //////////////////////////////////////

  // TO BE USED FOR CALLING BACKEND
  useEffect(() => {
    browser.runtime.sendMessage({type: "fetch_api"});
  }, []);

  browser.runtime.onMessage.addListener(function(request,sender, sendResponse) {
    if(request.type === "fetch_response") {
      setBackendData(request.data);
    }
  })
  

  return (
    <>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <p>
          {JSON.stringify(backendData)}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}

export default App;
