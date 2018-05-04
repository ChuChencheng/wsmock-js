export const mockUrl = 'ws://some.mock.url'

export const settings = (wsm) => {
  wsm.mock({
    url: mockUrl,
    sendInterval: 10000,
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
}
