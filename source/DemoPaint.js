import Immutable from 'immutable'

export function create() {
  return {
    grid: Immutable.Range(0, 8).map(() => (
      Immutable.Range(0, 8).map(() => 0).toList()
    )).toList(),
  }
}

export function render(state, buffer) {
  buffer.clear()
  state.grid.forEach((column, x) => {
    column.forEach((cell, y) => {
      buffer.set({x, y}, COLORS[cell])
    })
  })
  buffer.present()
}

const COLORS = [
  {red: 0, green: 0},
  {red: 3, green: 0},
  {red: 3, green: 1},
  {red: 3, green: 2},
  {red: 3, green: 3},
  {red: 2, green: 3},
  {red: 1, green: 3},
  {red: 0, green: 3},
];

export function update(state) {
  return state
}

export function reduceCellPress(state, position) {
  if (position.x >= 8) {
    return state
  }
  const value = (state.grid.get(position.x).get(position.y) + 1) % COLORS.length
  return {
    grid: state.grid.set(position.x, (
      state.grid.get(position.x).set(position.y, value)
    )),
  }
}
