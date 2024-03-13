import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

class CowinDashboard extends Component {
  state = {
    vaccineCoverageData: [],
    vaccineByAgeData: [],
    vaccineByGenderData: [],
    apiStatusConstants: '',
  }

  componentDidMount() {
    this.getVacchinationDetails()
  }

  getVacchinationDetails = async () => {
    this.setState({apiStatusConstants: 'IN_PROGRESS'})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const vaccinationCoverage = data.last_7_days_vaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))

      const vaccineByAge = data.vaccination_by_age.map(each => ({
        age: each.age,
        count: each.count,
      }))

      const vaccineByGender = data.vaccination_by_gender.map(each => ({
        count: each.count,
        gender: each.gender,
      }))

      this.setState({
        vaccineCoverageData: vaccinationCoverage,
        vaccineByAgeData: vaccineByAge,
        vaccineByGenderData: vaccineByGender,
        apiStatusConstants: 'SUCCESS',
      })
    } else {
      this.setState({apiStatusConstants: 'FAILURE'})
    }
  }

  renderFailureView = () => (
    <div className="failure-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSucessView = () => {
    const {
      vaccineCoverageData,
      vaccineByAgeData,
      vaccineByGenderData,
    } = this.state
    return (
      <>
        <VaccinationCoverage vaccineCoverageData={vaccineCoverageData} />
        <VaccinationByGender vaccineByGenderData={vaccineByGenderData} />
        <VaccinationByAge vaccineByAgeData={vaccineByAgeData} />
      </>
    )
  }

  renderBasedOnAPI = () => {
    const {apiStatusConstants} = this.state
    switch (apiStatusConstants) {
      case 'SUCCESS':
        return this.renderSucessView()
      case 'IN_PROGRESS':
        return this.renderFailureView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-css"
          />
          <p className="logo-heading">Co-WIN</p>
        </div>
        <h1 className="logo-desc">CoWIN Vaccination in India</h1>
        {this.renderBasedOnAPI()}
      </div>
    )
  }
}

export default CowinDashboard
