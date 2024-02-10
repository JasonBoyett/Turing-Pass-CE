let site = window.location.href

window.addEventListener('focus', () => {
  console.log('focus changed')
  site = window.location.href
  chrome.runtime.sendMessage("tabFocused", site, 
    (message) => console.log(message) 
  )
})

chrome.runtime.onMessage.addListener(
  (message, _, sendResponse) => {
    if(message === 'contentUrl'){
      sendResponse(site)
    }
  }
)
