// import { URL } from 'whatwg-url'

export const procSentData = (data) => {
  let dataSize = 0
  let dataToBeSent = data
  // Data type confirm
  // String.
  if (typeof data === 'string') {
    dataSize += data.length
  }
  // ArrayBuffer. Use arrayBuffer.byteLength
  else if (data instanceof ArrayBuffer) {
    dataSize += data.byteLength
  }
  // Blob. Use blob.size
  else if (data instanceof Blob) {
    dataSize += data.size
  }
  // ArrayBufferView/TypedArray. Judge if has byteLength and BYTES_PER_ELEMENT
  else if (data.byteLength) {
    dataSize += data.byteLength * (data.BYTES_PER_ELEMENT || 1)
  }
  // Other type. ('' + data).length
  else {
    dataToBeSent = '' + data
    dataSize += dataToBeSent.length
  }
  return {
    dataToBeSent,
    dataSize,
  }
}

export const isValidUrl = (url) => {
  let _url = {}
  try {
    _url = new URL(url)
  } catch (error) {
    return `The URL '${url}' is invalid.`
  }
  const _protocol = _url.protocol
  if (_protocol !== 'ws:' && _protocol !== 'wss:') {
    return `The URL's scheme must be either 'ws' or 'wss'. '${_protocol.slice(0, -1)}' is not allowed.`
  }
  return true
}
