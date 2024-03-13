import {Component} from 'react'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

class VaccinationByGender extends Component {
  DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  render() {
    const {vaccineByGenderData} = this.props
    return (
      <div className="vaccination-coverage-bg">
        <h1 className="vacci-heading">Vaccination by gender</h1>
        <ResponsiveContainer width="100%" height={500} className="bar-chart-bg">
          <PieChart>
            <Pie
              cx="50%"
              cy="60%"
              data={vaccineByGenderData}
              startAngle={0}
              endAngle={180}
              innerRadius="40%"
              outerRadius="80%"
              dataKey="count"
            >
              <Cell name="Male" fill="#f54394" />
              <Cell name="Female" fill="#5a8dee" />
              <Cell name="Others" fill=" #2cc6c6" />
            </Pie>
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default VaccinationByGender
