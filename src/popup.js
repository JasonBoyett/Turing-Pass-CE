let url = ''
const form = document.getElementById('form')
const userPassword = document.getElementById('userPassword')
const urlFelid = document.getElementById('url')
const submit = document.getElementById('submit')
const newPass = document.getElementById('result')
const copy = document.getElementById('copy')
const resultContainer = document.getElementById('result-container')
const symbolsSelector = document.getElementById('symbols')
const resultLabel = document.getElementById('result-label')

const callback = (data) => {
  newPass.innerText = data.pass
}

const getPass = async (userPassword, url, symbols) => {
  try {
    console.log(userPassword, url)
    const path = `https://turing-pass-api-production.up.railway.app/jsonp?passWord=${userPassword}&siteName=${url}&symbols=${symbols}`
    const response = await fetch(path)
    if(response.ok){
      const data = await response.json()
      callback(data)
    }
    else{
      console.log('API error')
    }
  } catch (err) {
    console.error(err)
  }
}

const copyToClipboard = () => {
  const textArea = document.createElement("textarea")
  textArea.value = newPass.innerText
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand("copy")
  document.body.removeChild(textArea)
  newPass.innerText = 'Copied!'
}

urlFelid.value = url
submit.onclick = (async () => {
  const symbols = symbolsSelector.checked
  console.log(symbolsSelector.checked)
  form.remove()
  newPass.style.visibility = 'visible'
  await getPass(userPassword.value, urlFelid.value, symbols)
  copy.style.visibility = 'visible'
  resultContainer.classList.add('white-background')
  resultLabel.innerText = 'Your password is:'
  copy.onclick = () => copyToClipboard()
})

const onOpen = (() => {
  document.addEventListener('keydown', () =>{
    if(event.keyCode === 13){
      submit.click()
    }
  })
  chrome.runtime.sendMessage('getURL', (response) => {
    url = response
    urlFelid.value = url
  })
})()
