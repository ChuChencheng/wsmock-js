export const mockUrl = 'ws://some.mock.url'

export const settings = (wsm) => {
  wsm.mock({
    url: mockUrl,
    sendInterval: 'onreceive',
    receiver (data) {
      console.log(`%c------Get data from browser for url '${this.url}' start------`, 'color: green;')
      console.dir(data)
      console.log(`%c------Get data from browser for url '${this.url}' end------`, 'color: green;')
    },
    sender () {
      // Write your mock data
      this.response = 'A msg from mock WebSocket!'
    },
  })
  wsm.mock({
    url: mockUrl,
    sendInterval: 'onreceive',
    receiver (data) {
    },
    sender () {
    },
  })
  wsm.mock({
    url: /ws\:\/\/some\.(reg|exp)\.url/,
    sendInterval: 'onreceive',
    receiver (data) {
    },
    sender () {
      this.response = 'RegExp url'
    },
  })
}
