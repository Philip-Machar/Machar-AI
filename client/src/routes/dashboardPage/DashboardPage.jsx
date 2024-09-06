import './dashboardPage.css';
import { useAuth } from '@clerk/clerk-react';

const logo = `${import.meta.env.BASE_URL}logo.png`;
const chat = `${import.meta.env.BASE_URL}chat.png`;
const image = `${import.meta.env.BASE_URL}image.png`;
const code = `${import.meta.env.BASE_URL}code.png`;
const arrow = `${import.meta.env.BASE_URL}arrow.png`;

const DashboardPage = () => {

  const { userId } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const text = e.target.text.value;
    if (!text) return;

    await fetch("http://localhost:5000/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, text })
    });
  }

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
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." autoComplete="off"/>
          <button>
            <img src={arrow} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage
