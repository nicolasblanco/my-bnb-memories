const expect = require('chai').expect

const airbnbReservationParsed = require('./fixtures/reservation.json')
const AirbnbFormatter = require('../src/airbnb_formatter')
const airbnbResponse = [airbnbReservationParsed.reservation, new Error()]

describe('AirbnbFormatter', function () {
  describe('#reduceReservation', function () {
    it('returns a reduced reservation', function () {
      let result = AirbnbFormatter.reduceReservation(airbnbResponse[0])

      expect(result.total_price).to.exist
      expect(result.lat).to.exist
      expect(result.lng).to.exist
      expect(result.check_in).to.exist
      expect(result.check_out).to.exist
      expect(result.city).to.exist
      expect(result.country).to.exist
      expect(result.listing_picture_url).to.exist
      expect(result.host_picture_thumbnail_url).to.exist
    })
  })

  describe('#reduce', function () {
    it('filters errors and reduces all reservations', function () {
      let result = AirbnbFormatter.reduce(airbnbResponse)

      expect(result).to.have.lengthOf(1)
    })
  })
})
