settings(WsMock)

let ws

const open = () => {
  ws = new WebSocket(mockUrl)

  ws.onopen = () => {
    console.log('%cWebSocket connection opened.', 'color: red;')
  }

  ws.onmessage = (event) => {
    console.log('%c------On message start------', 'color: green;')
    console.dir(event)
    console.log('%c------On message end------', 'color: green;')
  }

  ws.onclose = () => {
    console.log('%cWebSocket connection closed.', 'color: red;')
  }
}

const send = () => {
  if (!ws) return
  ws.send('A message from browser')
  console.log(`%cBufferedAnoumt of this message sent: ${ws.bufferedAmount}`, 'color: blue;')
}

const close = () => {
  if (!ws) return
  ws.close()
}

document.querySelector('#open').addEventListener('click', open)
document.querySelector('#send').addEventListener('click', send)
document.querySelector('#close').addEventListener('click', close)
