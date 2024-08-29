import { useEffect, useRef } from 'react';
import './chatPage.css';
import NewPrompt from '../../components/newPrompt/NewPrompt';

const ChatPage = () => {
  const endRef = useRef();

  useEffect(() => {
    endRef.current.scrollIntoView({behavior: 'smooth'});
  }, []);
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from user ;slfk;dsf f ds; fdsf; kf ds;afkdsakdslf kd sf kdslf;k;df kds;fk dsfk dlf kds;fk dls fkds;fk ds;lfk ds; f</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from user</div>
          <NewPrompt />
          <div ref={endRef} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage;
