const colors = require('colors/safe')

const log = {
  info: message => console.log(message),
  error: message => console.log(colors.red(message)),
  success: message => console.log(colors.green(message))
}

const logOutput = emitter => {
  emitter.stdout.on('data', data => log.info(data.toString()))
  emitter.stderr.on('data', data => log.error(data.toString()))
}

module.exports = {
  log,
  logOutput
}
