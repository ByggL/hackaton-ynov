// @ts-nocheck

/**
 * BACKGROUND.TS IS THE SCRIPT EXECUTED FOR ANY BACKGROUND OPERATION
 * ANY BACKGROUND OPERATION MUST PASS BY THIS SCRIPT
 *
 * WHEN THE CLIENT NEEDS TO INTERACT WITH APIs, A MESSAGE MUST BE SENT HERE TO DO THE PROCESSING
 * THEN ANOTHER MESSAGE CONTAINING THE RESPONSE AND EVENTUALLY THE API DATA MUST BE SENT BACK TO THE CLIENT
 *
 * IT'S WHAT IS DIFFICULT IN DEVELOPING BROWSER EXTENSIONS, YOU CAN'T JUST DO EVERYTHING ON THE CLIENT SCRIPT(S)
 */

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "fetch_api") {
      // fetch backend data from API, then append the personal list of whether the tasks are done or not
      fetch("http://localhost:8000/api", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // the "done" list is purely personal, and is stored in the browser using the storage API
          // the data stored within the storage API remains across sessions, so it will be kept if you close and reopen your browser
          browser.storage.sync
            .get("doneList")
            .then((res) => {
              let list = res.doneList;

              const formattedData = data.map((item: any) => {
                return list[item.title] ? { ...item, is_done: list[item.title] } : { ...item, is_done: false };
              });

              console.log(JSON.stringify(formattedData, null, 4));
              const now = new Date();
              const end = new Date(formattedData[0].endDate);
              const difference = end.getTime() - now.getTime();
              console.log(difference);
              browser.runtime.sendMessage({ type: "fetch_response", data: formattedData });
            })
            .catch(() => {
              // the catch instructions exist in case the "done" list hasn't yet been created
              const formattedData = data.map((item: any) => {
                return { ...item, is_done: false };
              });

              console.log(JSON.stringify(formattedData, null, 4));
              let end = new Date(formattedData[0].endDate);
              console.log(end.getTime());
              browser.runtime.sendMessage({ type: "fetch_response", data: formattedData });
            });
        });

      return true;
    }

    if (request.type === "toggle_done") {
      // changes the "done" value in the user's done list for the related task.
      console.log("toggle done");
      browser.storage.sync
        .get("doneList")
        .then((res) => {
          let list = res.doneList;
          list[request.title] = request.value;

          browser.storage.sync.set({ doneList: list });
        })
        .catch(() => {
          var list = {};
          list[request.title] = request.value;

          browser.storage.sync.set({ doneList: list });
        });

      return true;
    }

    return true;
  });
});
