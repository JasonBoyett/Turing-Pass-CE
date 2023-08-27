let sight = window.location.href

window.addEventListener('focus', () => {
  console.log('focus changed')
  sight = window.location.href
  chrome.runtime.sendMessage("tabFocused", sight, 
    (message) => console.log(message) 
  )
})

chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    if(message === 'contentUrl'){
      sendResponse(sight)
    }
  }
)

