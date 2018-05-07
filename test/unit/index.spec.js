import wsm from '@/wsmock'
console.log(wsm)
wsm.mock({
  url: 'ws://some.mock.url',
  sendInterval: 10000,
  receiver (data) {
    console.log(data)
  },
  sender () {
    // Write your mock data
    this.response = 'A msg from mock WebSocket!'
  },
})

describe('Invoke native WebSocket if url not specified in settings.', () => {
  it('Should invoke native', (done) => {
    // const ws = new WebSocket('not_mock_url')
    assert(true)
    done()
  })
})
