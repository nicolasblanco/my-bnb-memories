class AirbnbStats {
  static byTotalPrice (reservations) {
    return {
      labels: reservations.map(res => res.check_in),
      datasets: [
        {
          label: 'By total price',
          backgroundColor: '#f87979',
          data: reservations.map(res => res.total_price)
        }
      ]
    }
  }
}

export default AirbnbStats
