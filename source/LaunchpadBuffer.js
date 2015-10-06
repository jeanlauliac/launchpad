
export default class LaunchpadBuffer {

  constructor(driver) {
    this._driver = driver
    this._bufferIndex = 0
    this._buffers = []
    for (let b = 0; b < 2; ++b) {
      this._buffers.push(emptyBuffer())
    }
    driver.reset()
  }

  clear() {
    this._buffers[this._bufferIndex] = emptyBuffer()
  }

  set(position, color) {
    this._buffers[this._bufferIndex][position.x][position.y] = (
      Object.assign({}, color)
    )
  }

  get(position) {
    return this._buffers[this._bufferIndex][position.x][position.y]
  }

  present() {
    for (let x = 0; x < 9; ++x) {
      for (let y = 0; y < 8; ++y) {
        const newColor = this._buffers[this._bufferIndex][x][y]
        if (!areColorsEqual(
          this._buffers[1 - this._bufferIndex][x][y],
          newColor
        )) {
          this._driver.setCell({x, y}, newColor)
        }
        this._buffers[1 - this._bufferIndex][x][y] = newColor
      }
    }
    this._bufferIndex = 1 - this._bufferIndex
  }

}

function areColorsEqual(a, b) {
  return a.red === b.red && a.green === b.green
}

function emptyBuffer() {
  const buffer = []
  for (let x = 0; x < 9; ++x) {
    const column = []
    buffer.push(column)
    for (let y = 0; y < 8; ++y) {
      column.push({red: 0, green: 0})
    }
  }
  return buffer
}
