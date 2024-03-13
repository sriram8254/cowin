import {Component} from 'react'
import {
  Bar,
  BarChart,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

class VaccinationCoverage extends Component {
  DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  render() {
    const {vaccineCoverageData} = this.props

    return (
      <div className="vaccination-coverage-bg">
        <p className="vacci-heading">Vaccination Coverage</p>
        <ResponsiveContainer width="100%" height={500} className="bar-chart-bg">
          <BarChart
            data={vaccineCoverageData}
            margin={{
              top: 5,
            }}
          >
            <XAxis
              dataKey="vaccineDate"
              tick={{
                stroke: 'gray',
                strokeWidth: 1,
              }}
            />
            <YAxis
              tick={{
                stroke: 'gray',
                strokeWidth: 1,
              }}
              tickFormatter={this.DataFormatter}
            />
            <Legend
              wrapperStyle={{
                padding: 30,
              }}
            />
            <Bar dataKey="dose1" name="Dose1" fill=" #5a8dee" barSize="20%" />
            <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="20%" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default VaccinationCoverage
