const EventEmitter = require('events')

const Logger = require('./logger-event')
const logger = new Logger()

// register a listner
//emitter.on('logging', function (arg) {
logger.on('logging', (arg) => {
    console.log('Listener called', arg)
})

logger.log("this is log message")