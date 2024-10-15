// @ts-nocheck
import data from './testData.json';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type === "fetch_api") {

      // fetch('http://localhost/8000/api')
      // .then((res) => {
      //   res.json();
      // }).then((data) => {
      //   // processing over there
      // })

      browser.storage.sync.get("doneList").then((res) => {
        let list = res.doneList;

        const formattedData = data.map((item: any) => {
          return list[item.title] ? {...item, is_done: list[item.title]} : {...item, is_done: false};
        })

        console.log(JSON.stringify(formattedData, null, 4))
        browser.runtime.sendMessage({type: "fetch_response", data: formattedData})
      }).catch(()=> {
        const formattedData = data.map((item: any) => {
          return {...item, is_done: false};
        })

        console.log(JSON.stringify(formattedData, null, 4))
        browser.runtime.sendMessage({type: "fetch_response", data: formattedData})
      })

      return true;
    }

    if(request.type === "toggle_done") {
      console.log("toggle done")
      browser.storage.sync.get("doneList").then((res) => {

        let list = res.doneList;
        list[request.title] = request.value;

        browser.storage.sync.set({doneList: list});
      }).catch(() => {
        var list = {};
        list[request.title] = request.value;

        browser.storage.sync.set({doneList: list});
      })

      return true;
    }

  return true;
  })
});
