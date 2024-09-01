import { useEffect, useRef } from 'react';
import './newPrompt.css';

const attachment = `${import.meta.env.BASE_URL}attachment.png`;
const arrow = `${import.meta.env.BASE_URL}arrow.png`;

const NewPrompt = () => {
  const endRef = useRef();

  useEffect(() => {
    endRef.current.scrollIntoView({behavior: 'smooth'});
  }, []);

  return (
    <>
      <div className="endChat" ref={endRef} />
      <form className="newForm">
        <label htmlFor="file">
          <img src={attachment} alt="attachment" />
        </label>
        <input id="file" type="file" multiple={false} hidden/>
        <input type="text" placeholder="Ask me anything..." />
        <button>
          <img src={arrow} alt="arrow" />
        </button>
      </form>
    </>
  )
}

export default NewPrompt;
