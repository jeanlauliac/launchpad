
export function create() {
  return {particles: []}
}

export function render(state, buffer) {
  buffer.clear()
  state.particles.forEach(particle => {
    buffer.set(particle.position, particle.color)
  })
  buffer.present()
}

export function update(state) {
  let particles = state.particles.map(particle => ({
    generation: particle.generation,
    position: {
      x: particle.position.x + particle.velocity.x,
      y: particle.position.y + particle.velocity.y,
    },
    color: particle.color,
    velocity: particle.velocity,
  }))
  particles = particles.concat(particles.map(particle => {
    if (particle.generation === 0) {
      return {
        generation: 1,
        position: particle.position,
        color: {red: 1, green: 3},
        velocity: {x: particle.velocity.y, y: -particle.velocity.x},
      };
    }
    return null;
  }))
  particles = particles.filter(particle => (
    particle != null &&
    particle.position.y < 8 && particle.position.y >= 0 &&
    particle.position.x < 9 && particle.position.x >= 0
  ))
  return {particles}
}

export function reduceCellPress(state, position) {
  const {particles} = state
  const color = {red: 3, green: 1}
  particles.push({generation: 0, position, color, velocity: {x: 1, y: 0}})
  particles.push({generation: 0, position, color, velocity: {x: -1, y: 0}})
  particles.push({generation: 0, position, color, velocity: {x: 0, y: 1}})
  particles.push({generation: 0, position, color, velocity: {x: 0, y: -1}})
  return {particles}
}
