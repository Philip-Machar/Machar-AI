import './homepage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

import orbital from '../../../public/orbital.png';
import bot from '../../../public/bot.png';
import logo from '../../../public/logo.png';
import human1 from '../../../public/human1.jpeg';
import human2 from '../../../public/human2.jpeg';

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <div className='homepage'>
      <img className="orbital" src={orbital} alt="orbital image" />
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
          <img className="bot" src={bot} alt="bot image" />
          <div className="chat">
            <img src={typingStatus === "human1" ? human1 : typingStatus === "human2" ? human2 : bot} />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Human: We produce food for',
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
                'Bot: produce food for Chin',
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
        <img src={logo} alt="logo image" />
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
