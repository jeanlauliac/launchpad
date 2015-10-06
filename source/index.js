import LaunchpadDriver from './LaunchpadDriver'

function main() {

  const driver = new LaunchpadDriver(0)

  driver.reset()
  // for (let y = 0; y < 8; ++y) {
  //   for (let x = 0; x < 9; ++x) {
  //     driver.setCell({x, y}, {red: x/2, green: y/2})
  //   }
  //   driver.setControl(y, {red: y/2, green: 0})
  // }
  driver.on('cellPress', position => {
    driver.setCell(position, {red: 3, green: 0})
  }).on('cellRelease', position => {
    driver.setCell(position, {red: 0, green: 0})
  })

}

main()
