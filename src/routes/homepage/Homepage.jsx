import './homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className='homepage'>
      <img className="orbital" src="/orbital.png" alt="orbital image" />
      <div className="left">
        <h1>MACHAR AI</h1>
        <h2>Super charge your creativity and productivity</h2>
        <h3>
          Machar AI boosts your creativity and productivity with its intelligent, quick, and reliable support.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="img-container">
          <div className="bg-container">
            <div className="bg"></div>
          </div>
          <img className="bot" src="/bot.png" alt="bot image" />
        </div>
      </div>
    </div>
  )
}

export default Homepage;
