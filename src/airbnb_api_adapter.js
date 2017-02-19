const rp = require('request-promise-native')
const _ = require('lodash')
const Promise = require('promise')

const DEFAULT_PARAMS = {
  _format: 'default',
  _limit: 50,
  _offset: 0,
  pending: false,
  client_id: process.env.AIRBNB_CLIENT_ID,
  locale: 'en-US',
  currency: 'EUR'
}

const API_URL_V1 = 'https://api.airbnb.com/v1'
const API_URL_V2 = 'https://api.airbnb.com/v2'

/**
 *  Class used to make all connections to Airbnb private API.
 *  All functions making requests return a Promise.
 */
class AirbnbApiAdapter {
  getHeaders () {
    return {
      'X-Airbnb-OAuth-Token': this.config.access_token
    }
  }

  authorize (username, password) {
    let options = {
      uri: `${API_URL_V1}/authorize`,
      method: 'POST',
      qs: {
        client_id: process.env.AIRBNB_CLIENT_ID
      },
      form: {
        username: username,
        password: password,
        grant_type: 'password'
      },
      json: true
    }

    return rp(options)
  }

  getLatestTrips () {
    let options = {
      uri: `${API_URL_V2}/trip_schedules`,
      qs: DEFAULT_PARAMS,
      headers: this.getHeaders(),
      json: true
    }

    return rp(options)
  }

  getAllReservations (numbers) {
    return Promise.all(numbers.map(number => this.getReservation(number).catch(e => e)))
  }

  getReservation (number) {
    let options = {
      uri: `${API_URL_V2}/reservations/${number}`,
      qs: _.assign({}, DEFAULT_PARAMS, {
        '_format': 'for_mobile_guest'
      }),
      headers: this.getHeaders(),
      json: true
    }

    return rp(options)
  }

  constructor (config = {}) {
    this.config = config
  }
}

module.exports = AirbnbApiAdapter
