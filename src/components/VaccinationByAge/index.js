import {Component} from 'react'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

class VaccinationByAge extends Component {
  DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  render() {
    const {vaccineByAgeData} = this.props
    return (
      <div className="vaccination-coverage-bg">
        <p className="vacci-heading">Vaccination by age</p>
        <ResponsiveContainer width="100%" height={500} className="bar-chart-bg">
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={vaccineByAgeData}
              startAngle={0}
              endAngle={360}
              innerRadius="0%"
              outerRadius="60%"
              dataKey="count"
            >
              <Cell name="18-44" fill="#2d87bb" />
              <Cell name="44-60" fill="#a3df9f" />
              <Cell name="Above 60" fill="#64c2a6" />
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

export default VaccinationByAge
