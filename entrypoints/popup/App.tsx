import React, { useState, useEffect } from 'react';
import List from './components/List';
import './App.css';

function App() {
    /////////// STATE VARIABLES //////////
  const [backendData, setBackendData] = useState();
  //////////////////////////////////////

  // useEffect(() => {
  //   browser.runtime.sendMessage({type: "fetch_api"});
  // }, []);

  browser.runtime.sendMessage({type: "fetch_api"});

  browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type === "fetch_response") {
      let fetchedData = request.data;
      setBackendData(fetchedData);
    }
  })

    return (
        <div className="App" key={JSON.stringify(backendData)}>
            {backendData ? <List data={backendData} /> : ""}
        </div>
    );
};

export default App;
