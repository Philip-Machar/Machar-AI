import { useEffect, useState, useRef } from 'react';
import './newPrompt.css';
import model from '../../lib/gemini';
import { IKImage } from 'imagekitio-react';
import Upload from '../upload/Upload';
import Markdown from 'react-markdown';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const arrow = `${import.meta.env.BASE_URL}arrow.png`;

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAswer] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error: '',
    dbData: {},
    aiData:{}
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData, text] : [text]);

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAswer(accumulatedText);
      }

      mutation.mutate();
    } catch(err) {
      console.log(err);
    }

    setImg({
      isLoading: false,
      error: '',
      dbData: {},
      aiData:{}
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text);
  }

  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  return (
    <>
      {img.isLoading && <div>Loading...</div>}
      {img.dbData.filePath && (
        <IKImage 
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData.filePath}
          width="380"
          transformation={[{width: 300}]}
        />
      )}

      {question && <div className="message user">{question}</div>}
      {answer && !data?.history.some(message => message.parts[0].text === answer) && (
        <div className="message"><Markdown>{answer}</Markdown></div>
      )}
      <div className="endChat" ref={endRef} />
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden/>
        <input type="text" name="text" placeholder="Ask me anything..." autoComplete="off"/>
        <button>
          <img src={arrow} alt="arrow" />
        </button>
      </form>
    </>
  );
}

export default NewPrompt;
