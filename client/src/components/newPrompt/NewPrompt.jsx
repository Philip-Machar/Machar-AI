import { useEffect, useState, useRef } from 'react';
import './newPrompt.css';
import model from '../../lib/gemini';
import { IKImage } from 'imagekitio-react';
import Upload from '../upload/Upload';
import Markdown from 'react-markdown';

const arrow = `${import.meta.env.BASE_URL}arrow.png`;

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAswer] = useState("")
  const endRef = useRef();
  const [img, setImg] = useState({
    isLoading: false,
    error: '',
    dbData: {}
  });

  useEffect(() => {
    endRef.current.scrollIntoView({behavior: 'smooth'});
  }, [question, answer, img.dbData]);

  const add = async (text) => {
    setQuestion(text);

    const result = await model.generateContent(text);
    
    setAswer(result.response.text());
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const text = e.target.text.value;
    if (!text) return;

    add(text);
  }

  return (
    <>
      {img.isLoading && <div>Loading...</div>}
      {img.dbData.filePath && (
        <IKImage 
          urlEndpoint = {import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path = {img.dbData.filePath}
          width = "380"
          transformation = {[{width: 300}]}
        />
      )}

      {question && <div className="message user">{question}</div>}
      {answer && <div className="message"><Markdown>{answer}</Markdown></div>}
      <div className="endChat" ref={endRef} />
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden/>
        <input type="text" name="text" placeholder="Ask me anything..." autoComplete="off"/>
        <button>
          <img src={arrow} alt="arrow" />
        </button>
      </form>
    </>
  )
}

export default NewPrompt;
