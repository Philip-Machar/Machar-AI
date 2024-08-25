import './homepage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

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
          <div className="chat">
            <img src={typingStatus === "human1" ? "/human1.jpeg" : typingStatus === "human2" ? "/human2.jpeg" : "/bot.png"} />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Human: We produce food for Mice',
                2000, () => {
                  setTypingStatus("human1");
                },
                'Bot: produce food for Hamsters',
                2000, () => {
                  setTypingStatus("bot");
                },
                'Human: produce food for Guinea',
                2000, () => {
                  setTypingStatus("human2");
                },
                'Bot: produce food for Chinchillas',
                2000, () => {
                  setTypingStatus("bot");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="logo image" />
        <div className="links">
          <Link to="#">Terms of service</Link>
          <div>|</div>
          <Link to="#">Privacy policy</Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage;
