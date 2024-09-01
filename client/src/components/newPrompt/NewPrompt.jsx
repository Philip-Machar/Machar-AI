import { useEffect, useState, useRef } from 'react';
import './newPrompt.css';

import { IKImage } from 'imagekitio-react';

import Upload from '../upload/Upload';

const attachment = `${import.meta.env.BASE_URL}attachment.png`;
const arrow = `${import.meta.env.BASE_URL}arrow.png`;

const NewPrompt = () => {
  const endRef = useRef();
  const [img, setImg] = useState({
    isLoading: false,
    error: '',
    dbData: {}
  })

  useEffect(() => {
    endRef.current.scrollIntoView({behavior: 'smooth'});
  }, []);

  return (
    <>
    {img.dbData.filePath && (
      <IKImage 
        urlEndpoint = {import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
        path = {img.dbData.filePath}
      />
    )}
      <div className="endChat" ref={endRef} />
      <form className="newForm">
        <Upload setImg={setImg} />
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
