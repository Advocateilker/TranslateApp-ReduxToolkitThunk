import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { useEffect } from 'react';

import Select from 'react-select';
import { useState, useMemo } from 'react';
import { clearAnswer } from './redux/slices/translateSlice';
import { getLanguages, translateText } from './redux/actions/translateActions';

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.translateState);
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState({

    value: 'en',
    label: 'English',
  });
  const [targetLang, setTargetLang] = useState({
    value: 'de',
    label: 'German',
  });

   const refinedData = useMemo(() => {
    return state.languages.map((i) => ({
      value: i.code,
      label: i.name,
    }));
  }, [state.languages]);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const handleSwap = () => {

    setTargetLang(sourceLang);
    setSourceLang(targetLang);

    setText('');
    dispatch(clearAnswer());
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Translate +</h1>

        <div className="upper">
          <Select
            isLoading={state.isLoading}
            value={sourceLang}
            onChange={setSourceLang}
            isDisabled={state.isLoading}
            className="select"
            options={refinedData}
          />
          <button onClick={handleSwap}>Change</button>
          <Select
            onChange={setTargetLang}
            value={targetLang}
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            className="select"
            options={refinedData}
          />
        </div>

        <div className="center">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type the text you want to translate"
          ></textarea>
          <textarea
            className={state.isTextLoading ? 'loading' : ''}
            value={state.answer}
            disabled
          ></textarea>
        </div>

        <button
          onClick={() => {
            dispatch(translateText({ sourceLang, targetLang, text }));
          }}
          id="translate-btn"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;