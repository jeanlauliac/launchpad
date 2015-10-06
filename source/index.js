import LaunchpadDriver from './LaunchpadDriver'
import LaunchpadBuffer from './LaunchpadBuffer'

function main() {

  const driver = new LaunchpadDriver(0)
  const buffer = new LaunchpadBuffer(driver)

  const particules = []

  driver.on('cellPress', position => {
    buffer.set(position, {red: 3, green: 0})
    buffer.present()
  }).on('cellRelease', position => {
    buffer.set(position, {red: 0, green: 0})
    buffer.present()
  })

}

main()
