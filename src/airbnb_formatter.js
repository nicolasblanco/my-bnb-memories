const _ = require('lodash')
const isTypeofError = require('is-typeof-error')

/**
 *  Class used to reduce and format the response from the Airbnb API before
 *  handling it to the GUI.
 */
class AirbnbFormatter {
  static reduceReservation (reservation) {
    return {
      total_price: _.get(reservation, 'pricing_quote.price.total.amount'),
      lat: _.get(reservation, 'listing.lat'),
      lng: _.get(reservation, 'listing.lng'),
      check_in: _.get(reservation, 'check_in'),
      check_out: _.get(reservation, 'check_out'),
      city: _.get(reservation, 'listing.city'),
      country: _.get(reservation, 'listing.country'),
      listing_picture_url: _.get(reservation, 'listing.picture_url'),
      host_picture_thumbnail_url: _.get(reservation, 'listing.hosts[0].thumbnail_url')
    }
  }

  static reduce (reservations) {
    return reservations.filter(result => !isTypeofError(result))
                       .map(result => this.reduceReservation(result.reservation))
  }

  static formatResponse (reservations) {
    let reducedReservations = this.reduce(reservations)

    return {
      results: reducedReservations
    }
  }
}

module.exports = AirbnbFormatter
