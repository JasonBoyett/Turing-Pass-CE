let url = ''
const tabs = chrome.tabs
const runtime = chrome.runtime
console.log('background running')

const extractWebsiteName = (url) => {
  const regex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:\/|$)/;
  const match = url.match(regex)
  
  if (match && match[1]) {
    return match[1]
  } else {
    return url
  }
}
tabs.onActivated.addListener( () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    url = extractWebsiteName(tabs[0].url)
    console.log(url)
  })
})

tabs.onUpdated.addListener( () => {  
  tabs.query({active: true, currentWindow: true}, (tabs) => {
    url = extractWebsiteName(tabs[0].url)
    console.log(url)
  })
})

tabs.onHighlighted.addListener( () => {
  tabs.query({active: true, currentWindow: true}, (tabs) => {
    url = extractWebsiteName(tabs[0].url)
    console.log(url)
  })
})


runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    if(message === 'getURL'){
      if(url !== ''){
        sendResponse(url)
      }
    }
    if(message === 'tabFocused'){
      url = message.url
      console.log("new active tab: " + url)
      sendResponse('ok')
    }
    else{
      chrome.windows.getCurrent({populate: true},(tab) => {
        url = tab.tabs.filter(tab => tab.active)[0].url
        console.log(url)
      })
    }
    sendResponse(url)
  }
)
