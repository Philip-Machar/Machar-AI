import './dashboardPage.css'
const logo = `${import.meta.env.BASE_URL}logo.png`;

const DashboardPage = () => {
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>Machar AI</h1>
        </div>
        <div className="options">
          
        </div>
      </div>
      <div className="formContainer"></div>
    </div>
  )
}

export default DashboardPage
