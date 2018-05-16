import { mockUrl, settings } from './settings'
settings(WsMock)

let ws

const open = () => {
  const regChecked = document.querySelector('#regexp-checkbox').checked
  const url = regChecked ? 'ws://some.exp.url' : mockUrl
  ws = new WebSocket(url)

  window.ws = ws

  ws.onopen = (event) => {
    console.log('%cWebSocket connection opened.', 'color: red;')
    console.dir(event)
  }

  ws.onmessage = (event) => {
    console.log('%c------On message start------', 'color: green;')
    console.dir(event)
    console.log('%c------On message end------', 'color: green;')
  }

  ws.onclose = (event) => {
    console.log('%cWebSocket connection closed.', 'color: red;')
    console.dir(event)
  }
}

const send = () => {
  if (!ws) return
  ws.send('A message from browser')
  console.log(`%cBufferedAnoumt of this message sent: ${ws.bufferedAmount}`, 'color: blue;')
}

const change = () => {
  if (!ws) return
  ws.onmessage = () => {
    console.log('New onmessage handler')
  }
  console.log('Onmessage handler changed.')
}

const close = () => {
  if (!ws) return
  ws.close()
}

document.querySelector('#open').addEventListener('click', open)
document.querySelector('#send').addEventListener('click', send)
document.querySelector('#change').addEventListener('click', change)
document.querySelector('#close').addEventListener('click', close)
