import './dashboardPage.css'
const logo = `${import.meta.env.BASE_URL}logo.png`;
const chat = `${import.meta.env.BASE_URL}chat.png`;
const image = `${import.meta.env.BASE_URL}image.png`;
const code = `${import.meta.env.BASE_URL}code.png`;
const arrow = `${import.meta.env.BASE_URL}arrow.png`;

const DashboardPage = () => {
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>Machar AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src={chat} />
            <span>Create New Chat</span>
          </div>
          <div className="option">
            <img src={image} />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src={code} />
            <span>Help me Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form>
          <input type="text" placeholder="Ask me anything..." />
          <button>
            <img src={arrow} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage
