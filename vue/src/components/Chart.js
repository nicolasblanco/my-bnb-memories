import { Bar } from 'vue-chartjs'
import AirbnbStats from '../services/airbnb_stats'

export default Bar.extend({
  props: ['data'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(AirbnbStats.byTotalPrice(this.data),
                     { responsive: true, maintainAspectRatio: false })
  }
})
