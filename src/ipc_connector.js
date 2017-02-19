const AirbnbApiAdapter = require('./airbnb_api_adapter')
const AirbnbFormatter = require('./airbnb_formatter')

/**
 *  Class used to set all Ipc connections between the GUI and server.
 */
class IpcConnector {
  constructor (ipc) {
    this.client = new AirbnbApiAdapter({
      access_token: process.env.AIRBNB_ACCESS_TOKEN
    })

    this.ipc = ipc
  }

  setIpcGetAuthorize () {
    this.ipc.on('get-authorize', (event, arg) => {
      console.log('ipc:', arg)

      if (this.client.config.access_token) {
        console.log('Using already set access_token')
        event.sender.send('reply-authorize', 'ok')
        return
      }

      this.client.authorize(arg.username, arg.password)
      .then(authorizeResponse => {
        console.log('authorizeResponse:', authorizeResponse)
        console.log('access_token:', authorizeResponse.access_token)

        this.client.config.access_token = authorizeResponse.access_token
        event.sender.send('reply-authorize', 'ok')
      })
      .catch(err => console.log(err))
    })
  }

  setIpcGetReservations (opts = {}) {
    this.ipc.on('get-reservations', (event, arg) => {
      console.log('ipc:', arg)
      console.log('client:', this.client)
      console.log('client.config', this.client.config)

      this.client.getLatestTrips()
      .then(latestTripsResponse =>
        this.client.getAllReservations(latestTripsResponse.trip_schedules.map(trip => trip.confirmation_code)))
      .then(results => {
        console.log('ipc:', 'reply-reservations')
        event.sender.send('reply-reservations', AirbnbFormatter.formatResponse(results))
        if (opts.window) {
          opts.window.setSize(1400, 1200, true)
        }
      })
      .catch(err => console.log(err))
    })
  }

  setAllIpcReceivers (opts = {}) {
    this.setIpcGetAuthorize()
    this.setIpcGetReservations(opts)
  }
}

module.exports = IpcConnector
