import React, { useState, useEffect } from "react";
import List from "./components/List";

function App() {
  /////////// STATE VARIABLES //////////
  const [backendData, setBackendData] = useState();
  //////////////////////////////////////

  // useEffect executes once after the component loads
  useEffect(() => {
    browser.runtime.sendMessage({ type: "fetch_api" }); // sends a message to background.ts to fetch the API data
  }, []);

  // listens for the response message from background.ts containing the fetched data
  browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "fetch_response") {
      let fetchedData = request.data;
      setBackendData(fetchedData);
    }
  });

  return (
    <div className="App" key={JSON.stringify(backendData)}>
      {/*Display refreshes every time the backend data changes*/}
      {backendData ? <List data={backendData} /> : ""}
    </div>
  );
}

export default App;
