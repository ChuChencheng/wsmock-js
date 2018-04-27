const mockUrl = 'ws://some.mock.url'

const settings = (wsm) => {
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
      this.response = {
        success: true,
        msg: null,
        data: {
          text: 'A msg from mock WebSocket!',
        },
      }
    },
  })
}
