import LaunchpadDriver from './LaunchpadDriver'
import LaunchpadBuffer from './LaunchpadBuffer'

function main() {

  const driver = new LaunchpadDriver(0)
  const buffer = new LaunchpadBuffer(driver)

  let particules = []

  let oneLoop = () => {
    buffer.clear()
    particules.forEach(particule => {
      buffer.set(particule.position, particule.color)
    })
    buffer.present()
    particules = particules.map(particule => ({
      position: {
        x: particule.position.x + particule.velocity.x,
        y: particule.position.y + particule.velocity.y,
      },
      color: particule.color,
      velocity: particule.velocity,
    })).filter(particule => (
      particule.position.y < 8 && particule.position.y >= 0 &&
      particule.position.x < 9 && particule.position.x >= 0
    ))
  }

  driver.on('cellPress', position => {
    const color = {red: 3, green: 1}
    particules.push({position, color, velocity: {x: 1, y: 0}})
    particules.push({position, color, velocity: {x: -1, y: 0}})
    particules.push({position, color, velocity: {x: 0, y: 1}})
    particules.push({position, color, velocity: {x: 0, y: -1}})
  })

  setInterval(oneLoop, 50)

}

main()
