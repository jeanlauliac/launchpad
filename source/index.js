import * as DemoParticles from './DemoParticles'
import * as DemoPaint from './DemoPaint'
import LaunchpadDriver from './LaunchpadDriver'
import LaunchpadBuffer from './LaunchpadBuffer'

const DEMOS = [DemoParticles, DemoPaint]

function main() {

  const driver = new LaunchpadDriver(0)
  const buffer = new LaunchpadBuffer(driver)

  let demoIndex = 0
  let demo = DEMOS[demoIndex]
  let state = demo.create()

  let oneLoop = () => {
    state = demo.update(state)
    demo.render(state, buffer)
  }

  driver.on('cellPress', position => {
    state = demo.reduceCellPress(state, position)
  })

  driver.on('controlPress', index => {
    if (index === 2) {
      demoIndex = demoIndex - 1 + DEMOS.length
    } else if (index === 3) {
      ++demoIndex
    }
    demoIndex = demoIndex % DEMOS.length
    demo = DEMOS[demoIndex]
    state = demo.create()
  })

  setInterval(oneLoop, 50)

}

main()
