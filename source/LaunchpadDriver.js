import {EventEmitter} from 'events'
import midi from 'midi'

export default class LaunchpadDriver extends EventEmitter {

  constructor(port) {
    super()
    this._midiOut = new midi.output()
    this._midiOut.openPort(port)
    this._midiIn = new midi.input()
    this._midiIn.openPort(port)
    this._midiIn.on('message', (deltaTime, [code, key, velocity]) => {
      if (code === CODE_CONTROL) {
        if (velocity === 127) {
          this.emit('controlPress', key - 104)
        } else if (velocity === 0) {
          this.emit('controlRelease', key - 104)
        }
      } else if (code === CODE_NOTE_ON) {
        if (velocity === 127) {
          this.emit('cellPress', decodePosition(key))
        } else if (velocity === 0) {
          this.emit('cellRelease', decodePosition(key))
        }
      }
    })
  }

  close() {
    this._midiOut.closePort()
    this._midiOut = null
    this._midiIn.closePort()
    this._midiIn = null
  }

  reset() {
    this._midiOut.sendMessage([CODE_CONTROL, 0, 0])
  }

  setCell(position, color, options) {
    this._midiOut.sendMessage([
      CODE_NOTE_ON,
      encodePosition(position),
      encodeColor(
        color || {red: 0, green: 0},
        options || {copy: true, clear: true}
      ),
    ])
  }

  setControl(index, color, options) {
    this._midiOut.sendMessage([
      CODE_CONTROL,
      104 + clamp(index, 0, 7),
      encodeColor(
        color || {red: 0, green: 0},
        options || {copy: true, clear: true}
      ),
    ])
  }

}

const CODE_NOTE_ON = 144
const CODE_CONTROL = 176

function encodePosition(position) {
  return (
    16 * (clamp(Math.floor(position.y), 0, 7) % 8) +
    clamp(Math.floor(position.x), 0, 8)
  )
}

function decodePosition(index) {
  return {
    x: index % 16,
    y: Math.floor(index / 16),
  }
}

function encodeColor(color, options) {
  return (
    clamp(Math.floor(color.red), 0, 3) +
    (+(options.copy) << 2) +
    (+(options.clear) << 3) +
    (clamp(Math.floor(color.green), 0, 3) << 4)
  )
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}
