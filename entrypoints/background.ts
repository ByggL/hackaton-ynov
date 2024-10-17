// @ts-nocheck
// import data from './testData.json';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type === "fetch_api") {

      fetch('http://localhost:8000/api',{
        headers: {
            'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        return response.json();
      }).then((data) => {
        browser.storage.sync.get("doneList").then((res) => {
          let list = res.doneList;
  
          const formattedData = data.map((item: any) => {
            return list[item.title] ? {...item, is_done: list[item.title]} : {...item, is_done: false};
          })
  
          console.log(JSON.stringify(formattedData, null, 4))
          const now = new Date();
        const end = new Date(formattedData[0].endDate);
        const difference = end.getTime() - now.getTime();
        console.log(difference)
          browser.runtime.sendMessage({type: "fetch_response", data: formattedData})
        }).catch(()=> {
          const formattedData = data.map((item: any) => {
            return {...item, is_done: false};
          })
  
          console.log(JSON.stringify(formattedData, null, 4));
          let end = new Date(formattedData[0].endDate);
          console.log(end.getTime());
          browser.runtime.sendMessage({type: "fetch_response", data: formattedData})
        })
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
