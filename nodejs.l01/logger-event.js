const EventEmitter = require('events')

const url = "http://mylogger.io/log"

class LoggerEvent extends EventEmitter {
    log(message) {
        console.log(message);

        this.emit("logging", {
            message: "this is logger by event"
        })
    }
}

module.exports = LoggerEvent;