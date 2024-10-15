import { useState, useEffect } from 'react';
import reactLogo from '@/assets/react.svg';
import List from './components/List';
import wxtLogo from '/wxt.svg';
import './App.css';

const App = () => {
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
        <div className="App">
            <List data={backendData} />
        </div>
    );
};

export default App;
