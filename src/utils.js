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
  // If URL API does not exist, just check if url was a string type and not empty.
  // Other polyfill modules would make this module size too huge and url validation is not quite necessary.
  if (typeof URL !== 'function') {
    return typeof url === 'string' && url !== ''
  }
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

export const isUrlMatched = (url1, url2) => {
  if ((typeof url1 === typeof url2) && (typeof url1 === 'string')) {  // If both string.
    return url1 === url2
  } else if ((url1 instanceof RegExp) && (url2 instanceof RegExp)) {
    return url1.toString() === url2.toString()
  } else {
    let str
    const reg = (url1 instanceof RegExp) ? (str = url2, url1) : (url2 instanceof RegExp ? (str = url1, url2) : undefined)
    if (reg === undefined) return false
    return reg.test(str)
  }
}
